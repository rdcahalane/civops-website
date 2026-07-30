# HighByte auto-config — Paint 4 / cell 022 sealer (ABB)

Generated from the real Cimplicity export (`ISS_022_POINTS`) by `gen-highbyte-model.py`.

## Files
- `gen-highbyte-model.py` — generator (reads `ISS_022_POINTS`, emits the JSON below).
- `highbyte-paint4-sealer-model.json` — HighByte models + instances.

## What it contains
- **Models** (documented HighByte schema: `name`, `description`, `groupAs`, `attributes[]`):
  - `Paint4_AxisTorque` — child model: per-axis `torqueValue / torqueMin / torqueMax / torqueM1Mean / torqueM2Mean` (Real32). This is the Senseye PdM input.
  - `Robot_ABB_Sealer` — parent: `controllerState`, `programIndex`, applicator I/O (`appEnabled`, `appError`, `hvDisable`, `gun1On`, `cbsMotorOn`), command handshake, cell/safety I/O, plus `axis` (Modeled → `Paint4_AxisTorque`, array of 7). Composition via the `Modeled` attribute type.
- **Instances** `P4SL2201 … P4SL2206` — one per sealer robot, each with `attributeSources` binding every model attribute to its **real** Cimplicity point address (e.g. `SL2201.RAPID.Monitor1Tsk.TorqueData.nAxis_1_Torque_Value`). Instance names match the live asset code.

## Import
```
# token
curl -s -X POST http://<hub>:45245/login -d '{"username":"...","password":"..."}'
# partial import (merge by name — safe to re-run)
curl -s -X POST http://<hub>:45245/v1/project/partial/import \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     --data @highbyte-paint4-sealer-model.json
```

## ⚠ Validate before importing
The **model/attribute** shape follows HighByte's documented schema. Two things are **not** public and must be checked against a real export from the target hub (`GET /v1/project/export`):
1. **Project wrapper** — confirm the top-level keys. This file uses `{ "models": [...], "instances": [...] }`; a real export may nest these (e.g. under a project/version envelope).
2. **Instance binding shape** — `attributeSources` (attr → Cimplicity ADDR) is a best-effort mapping; HighByte instances bind attributes via expressions/source on a connection. Confirm the exact instance JSON and adjust `sourceConnection` ("Cimplicity_ISS_022") to the real connection name.

Once validated against one hand-built example exported from the hub, the generator can be aligned 1:1 and re-run to auto-config all robots.

## Regenerate
```
python3 gen-highbyte-model.py
```

## Stubs / next
- Cell 56 / base coat (and any Fanuc cells): add a `Robot_Fanuc_*` variant from that cell's Cimplicity export; the base structure carries over.
- Fault context: join `Paint4.dbo.ALARM_LOG.reference` to the instance on the asset code.
