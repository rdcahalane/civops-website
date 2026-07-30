#!/usr/bin/env python3
"""
Generate a HighByte Intelligence Hub model + instances from the real Cimplicity
point export for Nissan Smyrna Paint 4, cell 022 Sealer Automation (ABB robots).

Input : ISS_022_POINTS  (GE Cimplicity Shared Name File, CSV)
Output: highbyte-paint4-sealer-model.json

Shape follows the documented HighByte model schema:
  Model     = { name, description, groupAs, attributes[] }
  Attribute = { name, type(Simple|Modeled|Object), simpleType, model, array,
                required, nullable, description, defaultValue }
Composition is via a "Modeled" attribute that references a child model.

CAVEAT: the exact project-export *wrapper* keys are not public; validate the
top-level structure against an actual `GET /v1/project/export` from the target
hub before importing. Models/attributes follow the documented schema.
"""
import csv, re, json, sys, collections, os

SRC = os.path.join(os.path.dirname(__file__), "ISS_022_POINTS")

# Cimplicity PT_TYPE -> HighByte simpleType
TYPE_MAP = {
    "BOOL": "Boolean", "REAL": "Real32",
    "INT": "Int", "DINT": "Int", "SINT": "Int", "WORD": "Int", "UINT": "Int",
    "STRING": "String", "STRING_8": "String", "STRING_20": "String", "STRING_80": "String",
}

# Curated, meaningful attribute set (clean names) -> match on the RAPID/IO path tail.
# Each entry: attr_name -> (regex on normalized ADDR, group)
FLAT_SIGNALS = [
    ("controllerState",   r"\.ControllerState$",                              "state"),
    ("programIndex",      r"\.RAPID\.T_ROB1\.pntloop\.nProgramIndex$",        "state"),
    ("appEnabled",        r"\.IOSIGNALS\.AppEnabled$",                        "applicator"),
    ("appError",          r"\.IOSIGNALS\.AppError$",                          "applicator"),
    ("hvDisable",         r"\.IOSIGNALS\.HVDisable$",                         "applicator"),
    ("gun1On",            r"\.IOSIGNALS\.do_GrcGun1On$",                      "applicator"),
    ("cbsMotorOn",        r"\.IOSIGNALS\.CBSMotorOn$",                        "applicator"),
    ("command",           r"\.IOSIGNALS\.Command$",                           "command"),
    ("commandAck",        r"\.IOSIGNALS\.CommandAck$",                        "command"),
    ("commandError",      r"\.IOSIGNALS\.CommandError$",                      "command"),
    ("commandExecuting",  r"\.IOSIGNALS\.CommandExecuting$",                  "command"),
    ("autoMode",          r"\.IOSIGNALS\.doAutoMode$",                        "cell"),
    ("ghostMode",         r"\.IOSIGNALS\.GhostMode$",                         "cell"),
    ("stopSignal",        r"\.IOSIGNALS\.StopSignal$",                        "cell"),
    ("liftGateOpenReq",   r"\.IOSIGNALS\.LiftGateOpenReq$",                   "cell"),
    ("conveyorHoldReq",   r"\.IOSIGNALS\.ConveyorHoldReq$",                   "cell"),
]
# Axis torque (modeled child, array of 7). Per-axis fields -> source path templates.
AXIS_FIELDS = [
    ("torqueValue",  r"\.TorqueData\.nAxis_{n}_Torque_Value$",        "Real32"),
    ("torqueMin",    r"\.TorqueData\.nAxis_Torque_Data\{{{n},1\}}$",  "Real32"),
    ("torqueMax",    r"\.TorqueData\.nAxis_Torque_Data\{{{n},2\}}$",  "Real32"),
    ("torqueM1Mean", r"\.user\.nAxis_{n}_Torque_M1_Mean$",            "Real32"),
    ("torqueM2Mean", r"\.user\.nAxis_{n}_Torque_M2_Mean$",            "Real32"),
]
ROBOTS = [f"SL220{i}" for i in range(1, 7)]
N_AXES = 7

def load_abb(src):
    rows = open(src, newline="", encoding="latin-1").read().splitlines()
    s = next(i for i, l in enumerate(rows) if l.startswith("PT_ID,"))
    hdr = next(csv.reader([rows[s]]))
    pts = []
    for l in rows[s + 1:]:
        if not l or l.startswith("##"):
            continue
        r = next(csv.reader([l]))
        d = {hdr[i]: r[i] for i in range(min(len(hdr), len(r)))}
        if d.get("DEVICE_ID") == "ABB_ROBOT":
            pts.append(d)
    return pts

def main():
    pts = load_abb(SRC)
    # index by ADDR for source lookups
    by_addr = {p.get("ADDR", ""): p for p in pts}
    addrs = list(by_addr)

    def find(robot, pattern):
        """Return the real ADDR for a robot matching a normalized pattern."""
        rx = re.compile(pattern)
        for a in addrs:
            if a.startswith(robot + ".") and rx.search(a):
                return a
        return None

    # ---- child model: AxisTorque ----
    axis_attrs = [{
        "name": fn, "type": "Simple", "simpleType": st,
        "array": False, "required": False, "nullable": True,
        "description": f"ABB sealer robot per-axis {fn}"
    } for (fn, _pat, st) in AXIS_FIELDS]
    axis_model = {
        "name": "Paint4_AxisTorque",
        "description": "Per-axis torque (ABB RAPID Monitor1Tsk.TorqueData) — Senseye PdM input",
        "groupAs": "Nissan/Paint4",
        "attributes": axis_attrs,
    }

    # ---- parent model: Robot_ABB_Sealer ----
    parent_attrs = []
    missing = []
    for (name, pat, _grp) in FLAT_SIGNALS:
        sample = find("SL2201", pat)
        st = TYPE_MAP.get(by_addr[sample].get("PT_TYPE", ""), "String") if sample else "Boolean"
        if not sample:
            missing.append(name)
        parent_attrs.append({
            "name": name, "type": "Simple", "simpleType": st,
            "array": False, "required": False, "nullable": True,
            "description": (by_addr[sample].get("DESC", "").strip() if sample else "(tag not found in export)"),
        })
    parent_attrs.append({
        "name": "axis", "type": "Modeled", "model": "Paint4_AxisTorque",
        "array": True, "required": False, "nullable": True,
        "description": "7 robot axes (index 1-7)",
    })
    parent_model = {
        "name": "Robot_ABB_Sealer",
        "description": "ABB sealer robot (cell 022), derived from ISS_022 ABB_ROBOT points. "
                       "Aligns to OPC UA for Robotics MotionDevice->Axis.",
        "groupAs": "Nissan/Paint4",
        "attributes": parent_attrs,
    }

    # ---- instances: SL2201..SL2206 with real source bindings ----
    instances = []
    for rb in ROBOTS:
        binding = {}
        for (name, pat, _grp) in FLAT_SIGNALS:
            a = find(rb, pat)
            if a:
                binding[name] = a
        axis_binding = []
        for n in range(1, N_AXES + 1):
            row = {}
            for (fn, pat, _st) in AXIS_FIELDS:
                a = find(rb, pat.format(n=n))
                if a:
                    row[fn] = a
            axis_binding.append(row)
        binding["axis"] = axis_binding
        instances.append({
            "name": f"P4{rb}",                # matches the live asset code
            "model": "Robot_ABB_Sealer",
            "groupAs": "Nissan/Smyrna/Paint4/022-SealerAutomation",
            "sourceConnection": "Cimplicity_ISS_022",   # adjust to the real connection name
            "attributeSources": binding,      # attr name -> Cimplicity point ADDR
        })

    project = {
        "models": [axis_model, parent_model],
        "instances": instances,
    }
    out = os.path.join(os.path.dirname(__file__), "highbyte-paint4-sealer-model.json")
    json.dump(project, open(out, "w"), indent=2)
    print(f"wrote {out}")
    print(f"models: {len(project['models'])} | instances: {len(instances)} "
          f"| parent attrs: {len(parent_attrs)} | axis fields: {len(axis_attrs)}")
    if missing:
        print(f"WARNING: signals not found in export (left as stubs): {missing}")

if __name__ == "__main__":
    main()
