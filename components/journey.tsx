// The CivOps Path — the narrative spine of the site. Meets the prospect
// at "we need to go digital," then walks the de-risked adoption ladder:
// Recognize -> Assess -> Pilot -> Platform. Each stage earns the next,
// and scope accumulates toward the full AI platform. Leading with the
// assessment (the real, ready-today entry point) is deliberate — the
// platform is framed as the earned destination, by design.

import Link from "next/link";

type Stage = {
  n: string;
  phase: string;
  title: string;
  body: string;
  outcomes: string[];
  accent: string;
};

const STAGES: Stage[] = [
  {
    n: "01",
    phase: "Recognize",
    title: "You need to move into the digital space",
    body:
      "Paper travelers, OEE that lives in spreadsheets, and process knowledge that walks out the door at retirement. You know the status quo is a ceiling — the hard part is knowing where to start.",
    outcomes: ["The need is clear", "The starting point isn't", "Big-bang projects feel risky"],
    accent: "var(--co-muted)",
  },
  {
    n: "02",
    phase: "Assess",
    title: "Know exactly where to start",
    body:
      "A structured operational assessment — guided self-service or consultant-led — scores your maturity across 10 areas and hands back a prioritized roadmap. Clarity before commitment, signal before spend.",
    outcomes: ["Maturity scored across 10 areas", "Prioritized, ranked roadmap", "A plan, not a sales pitch"],
    accent: "var(--co-micro)",
  },
  {
    n: "03",
    phase: "Prove",
    title: "Prove it on one line",
    body:
      "Take the assessment's number-one opportunity and turn it into a live, measured win — a single line or site, in weeks. Real results in your own environment before you commit to scale.",
    outcomes: ["Focused pilot, weeks not years", "Measured against your own baseline", "Confidence earned, not promised"],
    accent: "var(--co-warm)",
  },
  {
    n: "04",
    phase: "Scale",
    title: "Land the AI platform — by design",
    body:
      "Everything you've proven, built upon. The full CivOps platform rolls out across the enterprise — role-specific HMI, work orders, the Health Index, and AI agents — engineered to solve your real business problems, by design.",
    outcomes: ["Enterprise-wide rollout", "AI agents working alongside operators", "Built to solve real problems, by design"],
    accent: "var(--co-enterprise)",
  },
];

export default function Journey() {
  return (
    <section id="path" className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--co-enterprise)" }}>
          The CivOps Path
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--co-text)] mb-4">
          Start where you are. Move at your own pace.
        </h2>
        <p className="text-[var(--co-muted)] leading-relaxed">
          No rip-and-replace, no all-or-nothing leap. CivOps gives you a structured path you walk at
          your own speed — a clear-eyed assessment to find where digital pays off first, a focused
          pilot that proves it in your own plant, then a platform that expands only as fast as it
          solves real problems for your team. Each step earns the next; you stay in control of the
          pace.
        </p>
      </div>

      {/* Connector line behind the stage nodes (desktop) */}
      <div className="relative">
        <div
          className="hidden lg:block absolute left-0 right-0 top-5 h-0.5"
          style={{
            background:
              "linear-gradient(90deg, var(--co-grid) 0%, var(--co-micro) 38%, var(--co-warm) 64%, var(--co-enterprise) 100%)",
            opacity: 0.6,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 relative">
          {STAGES.map((s, i) => (
            <div key={s.n} className="flex flex-col gap-4">
              {/* Node */}
              <div className="flex items-center gap-3">
                <div
                  className="relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold border-2"
                  style={{
                    background: "var(--co-ink)",
                    borderColor: s.accent,
                    color: s.accent,
                  }}
                >
                  {s.n}
                </div>
                <span
                  className="text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: s.accent }}
                >
                  {s.phase}
                </span>
              </div>

              {/* Card */}
              <div
                className="flex-1 rounded-2xl border bg-[var(--co-panel)] p-6 flex flex-col gap-4"
                style={{
                  borderColor:
                    i === STAGES.length - 1
                      ? "color-mix(in srgb, var(--co-enterprise) 45%, var(--co-grid))"
                      : "var(--co-grid)",
                }}
              >
                <h3 className="text-base font-bold text-[var(--co-text)] leading-snug">{s.title}</h3>
                <p className="text-sm text-[var(--co-muted)] leading-relaxed">{s.body}</p>
                <ul className="flex flex-col gap-2 mt-auto pt-1">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-[13px] text-[var(--co-muted)]">
                      <span className="mt-0.5 shrink-0" style={{ color: s.accent }}>
                        ▸
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entry-point CTA — lead with the real, ready first step */}
      <div className="mt-12 rounded-2xl border border-[var(--co-grid)] bg-[var(--co-panel)] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="font-semibold text-[var(--co-text)] mb-1">Most teams start with the assessment.</p>
          <p className="text-sm text-[var(--co-muted)] leading-relaxed">
            It&apos;s the lowest-risk way to find out where digital pays off first — and it stands on its
            own, whether or not you ever deploy the platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/#demo"
            className="rounded-md px-6 py-3 text-sm font-semibold text-[var(--co-ink)] text-center transition-opacity hover:opacity-90"
            style={{ background: "var(--co-enterprise)" }}
          >
            Start with an assessment
          </Link>
          <Link
            href="/#product"
            className="rounded-md border border-[var(--co-grid)] px-6 py-3 text-sm font-semibold text-[var(--co-muted)] text-center hover:border-[var(--co-enterprise)] hover:text-[var(--co-enterprise)] transition-colors"
          >
            See the destination →
          </Link>
        </div>
      </div>
    </section>
  );
}
