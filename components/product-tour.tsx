"use client";

// Product tour — the "show, don't tell" centerpiece. An interactive,
// tabbed showcase of curated, demo-grade CivOps surfaces rendered as
// pure SVG/CSS (no screenshots, no links into the live platform). It
// makes the site feel like a finished product while we fully control
// exactly what a prospect sees.

import { useState } from "react";

type TabId = "hmi" | "health" | "orders" | "exec";

const TABS: { id: TabId; label: string; blurb: string; accent: string }[] = [
  { id: "hmi",    label: "Operator HMI",      blurb: "Guided execution on the floor",      accent: "var(--co-enterprise)" },
  { id: "health", label: "Health Index",      blurb: "12 dimensions, one score",           accent: "var(--co-micro)" },
  { id: "orders", label: "Work Orders",       blurb: "Live across every shift",            accent: "var(--co-warm)" },
  { id: "exec",   label: "Executive View",    blurb: "Real-time site performance",         accent: "var(--co-enterprise)" },
];

export default function ProductTour() {
  const [tab, setTab] = useState<TabId>("hmi");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <section id="product" className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--co-enterprise)" }}>
          See It In Action
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--co-text)] mb-4">
          Your whole operation, on one screen
        </h2>
        <p className="text-[var(--co-muted)] leading-relaxed">
          From the operator at the panel to the executive reviewing the site, everyone works from the
          same live system. Click through the surfaces your team uses every shift.
        </p>
      </div>

      {/* Tab rail */}
      <div className="flex flex-wrap gap-3 mb-6">
        {TABS.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="group flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-all"
              style={{
                borderColor: on ? `color-mix(in srgb, ${t.accent} 55%, var(--co-grid))` : "var(--co-grid)",
                background: on ? `color-mix(in srgb, ${t.accent} 10%, var(--co-panel))` : "var(--co-panel)",
              }}
            >
              <span
                className="text-sm font-semibold transition-colors"
                style={{ color: on ? t.accent : "var(--co-text)" }}
              >
                {t.label}
              </span>
              <span className="text-xs text-[var(--co-muted)]">{t.blurb}</span>
            </button>
          );
        })}
      </div>

      {/* Device frame */}
      <div className="rounded-2xl border border-[var(--co-grid)] bg-[var(--co-panel)] overflow-hidden shadow-2xl">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-[var(--co-grid)]/70 bg-[var(--co-ink)] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 rounded-md border border-[var(--co-grid)]/60 bg-[var(--co-panel)] px-3 py-1 text-xs font-mono text-[var(--co-muted)]">
              <span style={{ color: "var(--co-enterprise)" }}>●</span>
              app.civops.io · Lakeside Plant / {active.label}
            </div>
          </div>
          <div className="w-14" />
        </div>

        {/* Screen body — keyed so each switch fades in */}
        <div key={tab} className="animate-in fade-in duration-300 p-5 sm:p-7 bg-[var(--co-ink)] min-h-[440px]">
          {tab === "hmi"    && <HmiMock />}
          {tab === "health" && <HealthMock />}
          {tab === "orders" && <OrdersMock />}
          {tab === "exec"   && <ExecMock />}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--co-muted)]/60">
        Representative interface. Configured to your equipment, roles, and production model during onboarding.
      </p>
    </section>
  );
}

/* ── Shared bits ──────────────────────────────────────────────────────── */

function Eyebrow({ children, color = "var(--co-muted)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color }}>
      {children}
    </span>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-[var(--co-grid)]/70 bg-[var(--co-panel)] p-4 ${className}`}>
      {children}
    </div>
  );
}

/* ── 1 · Operator HMI ─────────────────────────────────────────────────── */

function HmiMock() {
  const steps = [
    { t: "Verify line clear & guards engaged", done: true },
    { t: "Scan raw material lot — RM-2241", done: true },
    { t: "Confirm recipe BLND-12 · rev 3.2", done: true },
    { t: "Charge vessel to 12.0 kg (±0.2)", current: true },
    { t: "Mix 8 min @ 240 rpm", done: false },
    { t: "QA sample & sign-off", done: false },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <Eyebrow color="var(--co-enterprise)">Work Order · WO-4471</Eyebrow>
            <h3 className="text-xl font-bold text-[var(--co-text)] mt-1">Blend Batch — Line 2</h3>
          </div>
          <span className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: "color-mix(in srgb, var(--co-enterprise) 15%, transparent)", color: "var(--co-enterprise)" }}>
            In Progress · 50%
          </span>
        </div>

        <Panel>
          <Eyebrow>Guided Steps</Eyebrow>
          <ul className="mt-3 flex flex-col gap-2">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{
                    background: s.done ? "var(--co-enterprise)" : s.current ? "color-mix(in srgb, var(--co-warm) 20%, transparent)" : "var(--co-panel-2)",
                    color: s.done ? "var(--co-ink)" : s.current ? "var(--co-warm)" : "var(--co-muted)",
                    border: s.current ? "1px solid var(--co-warm)" : "1px solid var(--co-grid)",
                  }}>
                  {s.done ? "✓" : i + 1}
                </span>
                <span style={{ color: s.current ? "var(--co-text)" : s.done ? "var(--co-muted)" : "var(--co-muted)" }}
                  className={s.current ? "font-semibold" : ""}>
                  {s.t}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="flex flex-col gap-4">
        <Panel className="flex flex-col gap-3">
          <Eyebrow color="var(--co-warm)">Current Step</Eyebrow>
          <p className="text-sm font-semibold text-[var(--co-text)]">Charge vessel to 12.0 kg</p>
          <div className="rounded-lg bg-[var(--co-ink)] border border-[var(--co-grid)] p-3 text-center">
            <div className="font-mono text-3xl font-bold" style={{ color: "var(--co-enterprise)" }}>11.84<span className="text-base text-[var(--co-muted)]"> kg</span></div>
            <div className="text-[11px] text-[var(--co-muted)] mt-1">Live scale · target 12.0 ±0.2</div>
          </div>
          <button className="rounded-lg py-3 text-sm font-bold text-[var(--co-ink)]" style={{ background: "var(--co-enterprise)" }}>
            Confirm & Advance →
          </button>
        </Panel>
        <Panel>
          <Eyebrow>Capture</Eyebrow>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[["⌨", "Scan"], ["🎙", "Voice"], ["📷", "Photo"]].map(([icon, label]) => (
              <div key={label} className="rounded-lg border border-[var(--co-grid)] bg-[var(--co-ink)] py-3">
                <div className="text-lg">{icon}</div>
                <div className="text-[11px] text-[var(--co-muted)] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── 2 · Health Index radar ───────────────────────────────────────────── */

const HEALTH_DOMAINS = [
  { k: "Safety", v: 0.92 }, { k: "Quality", v: 0.88 }, { k: "Delivery", v: 0.81 },
  { k: "Throughput", v: 0.76 }, { k: "Maintenance", v: 0.69 }, { k: "Inventory", v: 0.84 },
  { k: "Cost", v: 0.72 }, { k: "Compliance", v: 0.95 }, { k: "Energy", v: 0.66 },
  { k: "Workforce", v: 0.79 }, { k: "Schedule", v: 0.83 }, { k: "Yield", v: 0.90 },
];

function radarPoint(cx: number, cy: number, r: number, i: number, n: number) {
  const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
}

function HealthMock() {
  const cx = 150, cy = 150, R = 120, n = HEALTH_DOMAINS.length;
  const rings = [0.25, 0.5, 0.75, 1];
  const dataPts = HEALTH_DOMAINS.map((d, i) => radarPoint(cx, cy, R * d.v, i, n));
  const dataPath = dataPts.map((p) => p.join(",")).join(" ");
  const overall = Math.round((HEALTH_DOMAINS.reduce((a, d) => a + d.v, 0) / n) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-center">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <Eyebrow color="var(--co-micro)">Site Health Index</Eyebrow>
            <h3 className="text-xl font-bold text-[var(--co-text)] mt-1">Lakeside Plant</h3>
          </div>
          <div className="text-right">
            <div className="font-mono text-4xl font-bold" style={{ color: "var(--co-enterprise)" }}>{overall}</div>
            <div className="text-[11px] text-[var(--co-muted)]">overall · ▲ 4 vs last wk</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {HEALTH_DOMAINS.map((d) => (
            <div key={d.k} className="flex items-center justify-between rounded-md border border-[var(--co-grid)]/60 bg-[var(--co-panel)] px-3 py-1.5">
              <span className="text-xs text-[var(--co-muted)]">{d.k}</span>
              <span className="text-xs font-mono font-semibold"
                style={{ color: d.v >= 0.85 ? "var(--co-enterprise)" : d.v >= 0.7 ? "var(--co-warm)" : "#ff7a6b" }}>
                {Math.round(d.v * 100)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <svg viewBox="0 0 300 300" className="w-full max-w-[340px]">
          {rings.map((r, ri) => (
            <polygon key={ri}
              points={HEALTH_DOMAINS.map((_, i) => radarPoint(cx, cy, R * r, i, n).join(",")).join(" ")}
              fill="none" stroke="var(--co-grid)" strokeWidth="1" opacity={0.5} />
          ))}
          {HEALTH_DOMAINS.map((_, i) => {
            const [x, y] = radarPoint(cx, cy, R, i, n);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--co-grid)" strokeWidth="1" opacity={0.4} />;
          })}
          <polygon points={dataPath} fill="color-mix(in srgb, var(--co-enterprise) 22%, transparent)"
            stroke="var(--co-enterprise)" strokeWidth="2" />
          {dataPts.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="var(--co-enterprise)" />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ── 3 · Work orders board ────────────────────────────────────────────── */

function OrdersMock() {
  const orders = [
    { id: "WO-4471", name: "Blend Batch — Line 2",   shift: "A", pct: 50, status: "Running",  tone: "var(--co-enterprise)" },
    { id: "WO-4470", name: "Fill & Pack — Line 5",   shift: "A", pct: 88, status: "Running",  tone: "var(--co-enterprise)" },
    { id: "WO-4468", name: "Changeover — Line 2",    shift: "A", pct: 100, status: "Complete", tone: "var(--co-micro)" },
    { id: "WO-4472", name: "QA Hold — Lot RM-2239",  shift: "A", pct: 0,  status: "Deviation", tone: "var(--co-warm)" },
    { id: "WO-4473", name: "Maintenance PM — Mixer 3", shift: "B", pct: 0,  status: "Queued",   tone: "var(--co-muted)" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Eyebrow color="var(--co-warm)">Work Orders · Today</Eyebrow>
          <h3 className="text-xl font-bold text-[var(--co-text)] mt-1">Live Board — All Lines</h3>
        </div>
        <div className="flex gap-2">
          {[["12", "Running", "var(--co-enterprise)"], ["3", "Holds", "var(--co-warm)"], ["41", "Done"]].map(([n, l, c]) => (
            <div key={l} className="rounded-lg border border-[var(--co-grid)] bg-[var(--co-panel)] px-3 py-1.5 text-center">
              <div className="text-base font-bold" style={{ color: (c as string) ?? "var(--co-text)" }}>{n}</div>
              <div className="text-[10px] text-[var(--co-muted)]">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center gap-4 rounded-xl border border-[var(--co-grid)]/70 bg-[var(--co-panel)] px-4 py-3">
            <span className="font-mono text-xs text-[var(--co-muted)] w-16 shrink-0">{o.id}</span>
            <span className="text-sm text-[var(--co-text)] flex-1 min-w-0 truncate">{o.name}</span>
            <span className="hidden sm:block text-[11px] text-[var(--co-muted)]">Shift {o.shift}</span>
            <div className="hidden sm:block w-28 h-1.5 rounded-full bg-[var(--co-ink)] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${o.pct}%`, background: o.tone }} />
            </div>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold w-24 text-center shrink-0"
              style={{ background: `color-mix(in srgb, ${o.tone} 15%, transparent)`, color: o.tone }}>
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 4 · Executive dashboard ──────────────────────────────────────────── */

function ExecMock() {
  const kpis = [
    { label: "OEE",          value: "84.2%", delta: "▲ 2.1",  tone: "var(--co-enterprise)" },
    { label: "On-Time Ship", value: "96.1%", delta: "▲ 0.8",  tone: "var(--co-enterprise)" },
    { label: "First-Pass Yield", value: "99.2%", delta: "▲ 0.3", tone: "var(--co-enterprise)" },
    { label: "Unplanned Downtime", value: "−38%", delta: "vs Q1", tone: "var(--co-micro)" },
  ];
  // simple trend line
  const pts = [38, 42, 40, 47, 52, 49, 58, 63, 61, 70, 74, 84];
  const w = 480, h = 120, max = 90;
  const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / max) * h}`).join(" ");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <Eyebrow color="var(--co-enterprise)">Executive Overview</Eyebrow>
          <h3 className="text-xl font-bold text-[var(--co-text)] mt-1">Lakeside Plant · This Quarter</h3>
        </div>
        <span className="text-[11px] text-[var(--co-muted)]">Updated live · 14:32</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <Panel key={k.label} className="flex flex-col gap-1">
            <Eyebrow>{k.label}</Eyebrow>
            <div className="text-2xl font-bold font-mono text-[var(--co-text)]">{k.value}</div>
            <div className="text-[11px] font-semibold" style={{ color: k.tone }}>{k.delta}</div>
          </Panel>
        ))}
      </div>

      <Panel>
        <div className="flex items-center justify-between mb-3">
          <Eyebrow>OEE Trend · 12 weeks</Eyebrow>
          <span className="text-[11px] font-semibold" style={{ color: "var(--co-enterprise)" }}>+46 pts since rollout</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" height={120}>
          <defs>
            <linearGradient id="oeefill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--co-enterprise)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--co-enterprise)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${h} ${path} ${w},${h}`} fill="url(#oeefill)" />
          <polyline points={path} fill="none" stroke="var(--co-enterprise)" strokeWidth="2.5"
            strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </Panel>
    </div>
  );
}
