"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import ProductTour from "@/components/product-tour";
import Journey from "@/components/journey";

// ── Demo request form ────────────────────────────────────────────────────────

function DemoForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus("done");
      formRef.current?.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-semibold mb-2" style={{ color: "var(--co-enterprise)" }}>
          Request received.
        </p>
        <p className="text-[var(--co-muted)] text-sm">
          We&apos;ll reach out within 1 business day to schedule your walkthrough.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--co-muted)]">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Jane Smith"
            className="rounded-md border border-[var(--co-grid)] bg-[var(--co-ink)] px-3 py-2 text-sm text-[var(--co-text)] placeholder:text-[var(--co-muted)]/40 focus:outline-none focus:border-[var(--co-enterprise)]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--co-muted)]">
            Work email <span style={{ color: "var(--co-warm)" }}>*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="rounded-md border border-[var(--co-grid)] bg-[var(--co-ink)] px-3 py-2 text-sm text-[var(--co-text)] placeholder:text-[var(--co-muted)]/40 focus:outline-none focus:border-[var(--co-enterprise)]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--co-muted)]">Company</label>
          <input
            name="company"
            type="text"
            placeholder="Acme Manufacturing"
            className="rounded-md border border-[var(--co-grid)] bg-[var(--co-ink)] px-3 py-2 text-sm text-[var(--co-text)] placeholder:text-[var(--co-muted)]/40 focus:outline-none focus:border-[var(--co-enterprise)]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--co-muted)]">Your role</label>
          <select
            name="role"
            className="rounded-md border border-[var(--co-grid)] bg-[var(--co-ink)] px-3 py-2 text-sm text-[var(--co-text)] focus:outline-none focus:border-[var(--co-enterprise)]"
          >
            <option value="">Select…</option>
            <option>VP / Director of Operations</option>
            <option>Plant Manager</option>
            <option>CIO / IT Leader</option>
            <option>OT / Controls Engineer</option>
            <option>CEO / Owner</option>
            <option>Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-[var(--co-muted)]">
            Biggest operational challenge? (optional)
          </label>
          <textarea
            name="challenge"
            rows={3}
            placeholder="e.g. No real-time visibility into shift performance. Work orders still on paper. Downtime data lives in spreadsheets…"
            className="rounded-md border border-[var(--co-grid)] bg-[var(--co-ink)] px-3 py-2 text-sm text-[var(--co-text)] placeholder:text-[var(--co-muted)]/40 focus:outline-none focus:border-[var(--co-enterprise)] resize-none"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong — email us directly at{" "}
          <a href="mailto:ryan@civops.io" className="underline">ryan@civops.io</a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md px-6 py-3 text-sm font-semibold text-[var(--co-ink)] transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed self-start"
        style={{ background: "var(--co-enterprise)" }}
      >
        {status === "submitting" ? "Sending…" : "Request a demo"}
      </button>
    </form>
  );
}

// ── Capability card ──────────────────────────────────────────────────────────

function CapabilityCard({
  accent,
  icon,
  title,
  description,
  features,
}: {
  accent: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div
      className="relative rounded-2xl border bg-[var(--co-panel)] p-8 flex flex-col gap-5 overflow-hidden"
      style={{ borderColor: `color-mix(in srgb, ${accent} 25%, var(--co-grid))` }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0 w-56 h-56 rounded-full blur-[80px] opacity-5"
        style={{ background: accent, transform: "translate(30%, -30%)" }}
      />
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0"
        style={{
          background: `color-mix(in srgb, ${accent} 15%, transparent)`,
          color: accent,
        }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-[var(--co-text)] mb-2">{title}</h3>
        <p className="text-sm text-[var(--co-muted)] leading-relaxed">{description}</p>
      </div>
      <ul className="flex flex-col gap-2 mt-auto">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[var(--co-muted)]">
            <span className="mt-0.5 shrink-0" style={{ color: accent }}>▸</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Problem stat ─────────────────────────────────────────────────────────────

function ProblemStat({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="flex flex-col gap-2 p-6 rounded-xl border border-[var(--co-grid)] bg-[var(--co-panel)]">
      <span className="text-3xl font-bold" style={{ color: "var(--co-warm)" }}>{stat}</span>
      <span className="text-sm text-[var(--co-muted)] leading-snug">{label}</span>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden co-grid-bg">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="w-[700px] h-[400px] rounded-full blur-[140px] opacity-5"
            style={{ background: "radial-gradient(ellipse, var(--co-enterprise) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
          <Image
            src="/civops-logo.png"
            alt="CivOps — The synaptic platform"
            width={440}
            height={227}
            priority
            className="w-[300px] sm:w-[400px] lg:w-[440px] h-auto rounded-xl"
          />

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--co-text)] leading-[1.06]">
            The plant-floor OS<br />
            <span style={{ color: "var(--co-enterprise)" }}>your team will actually use</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--co-muted)] max-w-2xl leading-relaxed">
            CivOps replaces fragmented OT systems, paper-based work orders, and tribal knowledge with
            a unified operations platform for mid-market manufacturers — adopted at your own pace, one
            proven step at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/#demo"
              className="rounded-md px-7 py-3.5 text-sm font-semibold text-[var(--co-ink)] transition-opacity hover:opacity-90"
              style={{ background: "var(--co-enterprise)" }}
            >
              Request a demo
            </Link>
            <Link
              href="/#path"
              className="rounded-md border border-[var(--co-grid)] px-7 py-3.5 text-sm font-semibold text-[var(--co-muted)] hover:border-[var(--co-enterprise)] hover:text-[var(--co-enterprise)] transition-colors"
            >
              See the approach →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Context stats ────────────────────────────────────────────────── */}
      <section className="bg-[var(--co-panel)] border-y border-[var(--co-grid)]/60">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--co-muted)] mb-10 text-center">
            The state of mid-market manufacturing
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProblemStat
              stat="67%"
              label="of manufacturers still use paper-based work orders for some or all processes"
            />
            <ProblemStat
              stat="23%"
              label="average OEE gap between what companies report and what sensors actually show"
            />
            <ProblemStat
              stat="18 mo"
              label="average MES implementation timeline — before operators work around it anyway"
            />
            <ProblemStat
              stat="40%"
              label="of institutional process knowledge exits when an experienced operator retires"
            />
          </div>
        </div>
      </section>

      {/* ── The CivOps Path (narrative spine: Need → Assess → Pilot → Platform) ── */}
      <Journey />

      {/* ── Platform capabilities ─────────────────────────────────────────── */}
      <section id="platform" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--co-enterprise)" }}>
            Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--co-text)] mb-4">
            Every layer of your operation, connected
          </h2>
          <p className="text-[var(--co-muted)] leading-relaxed">
            CivOps is a single platform — not a collection of point tools. Operators, supervisors,
            and executives all work from the same system, with role-specific views built for how
            they actually operate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CapabilityCard
            accent="var(--co-enterprise)"
            icon="⬡"
            title="Role-Specific HMI Screens"
            description="Operator interfaces designed for the plant floor, not the control room. Barcode scanning, voice capture, photo logging, and step-by-step guided workflows built for people who work with gloves on."
            features={[
              "Configurable per role: operator, QA, supervisor, maintenance",
              "Touch-optimized for industrial tablets and panels",
              "Voice-to-text capture for hands-free documentation",
              "Photo annotation with AI-assisted anomaly tagging",
            ]}
          />
          <CapabilityCard
            accent="var(--co-enterprise)"
            icon="≡"
            title="Batch Execution & Work Orders"
            description="Structured step-by-step execution with deviation capture and full audit trails. Every run is documented. Every variance is recorded. Compliance is built in, not bolted on."
            features={[
              "Guided batch execution with mandatory sign-off gates",
              "Work order orchestration across shifts and teams",
              "Real-time progress visibility for supervisors",
              "Automatic deviation logging and escalation routing",
            ]}
          />
          <CapabilityCard
            accent="var(--co-micro)"
            icon="⇄"
            title="Equipment & PLC Integration"
            description="Connects to your existing infrastructure without rip-and-replace. Native OPC-UA client with 19 PLC drivers — Rockwell, Siemens, Modbus, BACnet, DNP3, and more."
            features={[
              "OPC-UA native with 19 PLC driver library",
              "Rockwell ControlLogix, Siemens S7, Modbus TCP/RTU",
              "Real-time equipment state and health index tracking",
              "Configurable alert thresholds and escalation paths",
            ]}
          />
          <CapabilityCard
            accent="var(--co-micro)"
            icon="◈"
            title="AI Agents"
            description="Agents that work alongside operators — not instead of them. Voice routing, photo analysis, and automated HMI generation reduce cognitive load and accelerate onboarding."
            features={[
              "Voice classification agent routes operator requests automatically",
              "Photo analysis flags quality defects and equipment anomalies",
              "HMI generation agent builds new screen layouts from templates",
              "Health Index agent monitors 12 operational dimensions continuously",
            ]}
          />
        </div>
      </section>

      {/* ── Product tour (show, don't tell) ──────────────────────────────── */}
      <ProductTour />

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-[var(--co-panel)] border-y border-[var(--co-grid)]/60">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--co-enterprise)" }}>
              Deployment
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--co-text)] mb-4">
              Live in weeks, not an 18-month project
            </h2>
            <p className="text-[var(--co-muted)] leading-relaxed">
              CivOps ships with a structured setup wizard that guides you from blank slate to
              operational in days. No systems integrator required to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Configure your site",
                body: "Map your buildings, equipment registry, and workforce through the guided setup wizard. Define roles, connect PLCs, and load your standard batch templates. Done in hours.",
              },
              {
                step: "02",
                title: "Activate operations",
                body: "Role-specific HMI screens go live for every operator and supervisor. Work orders flow. PLC data streams in real time. Your first structured shift starts immediately.",
              },
              {
                step: "03",
                title: "Continuous intelligence",
                body: "The Health Index tracks 12 operational dimensions across your site. AI agents surface anomalies, flag deviations, and route issues before they become downtime events.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col gap-4">
                <div
                  className="text-5xl font-bold font-mono leading-none"
                  style={{ color: "color-mix(in srgb, var(--co-enterprise) 35%, var(--co-grid))" }}
                >
                  {step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--co-text)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--co-muted)] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Deployment model callout */}
          <div className="mt-16 rounded-2xl border border-[var(--co-grid)] bg-[var(--co-ink)] p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
              style={{
                background: "color-mix(in srgb, var(--co-enterprise) 15%, transparent)",
                color: "var(--co-enterprise)",
              }}
            >
              ◉
            </div>
            <div>
              <p className="font-semibold text-[var(--co-text)] mb-1">
                Simple, predictable pricing
              </p>
              <p className="text-sm text-[var(--co-muted)] leading-relaxed">
                CivOps isn&apos;t priced per employee, per workstation, or per piece of equipment. Your
                operation is complex enough — your software pricing shouldn&apos;t add to it. Add
                operators, lines, and assets without watching a meter, and your data stays in your
                environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who it&apos;s for ─────────────────────────────────────────────────── */}
      <section id="who" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--co-enterprise)" }}>
            Who It&apos;s For
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--co-text)] mb-4">
            Built for mid-market manufacturers
          </h2>
          <p className="text-[var(--co-muted)] leading-relaxed">
            Too complex for off-the-shelf apps. Too lean for a full MES implementation.
            CivOps is built for the 150–2,000 employee manufacturer that needs enterprise-grade
            operations without the enterprise implementation cost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              role: "VP / Director of Operations",
              pain: "You have no single source of truth. OEE data lives in SCADA exports, quality records are in Excel, and shift notes are in a binder.",
              value: "CivOps gives you a real-time operations dashboard across every site — without another ERP implementation.",
            },
            {
              role: "Plant Manager",
              pain: "Every shift runs differently. Standard procedures exist on paper but aren&apos;t followed consistently. Downtime root cause takes days to reconstruct.",
              value: "Structured batch execution enforces your SOPs digitally. Deviations are captured in real time, not reconstructed after the fact.",
            },
            {
              role: "CIO / IT Leader",
              pain: "OT and IT are completely separate. Your SCADA vendor locked you in. Adding any new capability means a six-figure integration project.",
              value: "Open-protocol architecture — OPC-UA, MQTT, REST. Works with what you have. Runs on Docker, deployable on-prem or cloud.",
            },
          ].map(({ role, pain, value }) => (
            <div
              key={role}
              className="rounded-2xl border border-[var(--co-grid)] bg-[var(--co-panel)] p-8 flex flex-col gap-5"
            >
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--co-enterprise)" }}>
                {role}
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--co-muted)]/50 mb-1.5">
                  The problem
                </p>
                <p
                  className="text-sm text-[var(--co-muted)] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: pain }}
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--co-enterprise)" }}>
                  With CivOps
                </p>
                <p className="text-sm text-[var(--co-muted)] leading-relaxed">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Fit summary */}
        <div className="mt-10 rounded-xl border border-[var(--co-grid)]/60 bg-[var(--co-panel)] p-6 flex flex-wrap gap-8 text-sm text-[var(--co-muted)]">
          {[
            ["Industry", "Discrete, process, batch, mixed-mode manufacturing"],
            ["Company size", "150 – 2,000 employees"],
            ["Site footprint", "1 – 20+ facilities"],
            ["OT environment", "Any — Rockwell, Siemens, legacy PLCs, or greenfield"],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--co-muted)]/50">
                {label}
              </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Demo CTA ──────────────────────────────────────────────────────── */}
      <section id="demo" className="bg-[var(--co-panel)] border-t border-[var(--co-grid)]/60">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--co-enterprise)" }}>
            Request a Demo
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--co-text)] mb-4">
            See CivOps in your environment
          </h2>
          <p className="text-[var(--co-muted)] mb-10 leading-relaxed">
            A 45-minute technical walkthrough using your operational context — your equipment
            types, your production model, your integration environment. No generic demo scripts.
          </p>
          <DemoForm />
        </div>
      </section>
    </>
  );
}
