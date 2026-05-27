import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — CivOps",
  description: "CivOps is built by operators and engineers who know what mid-market manufacturing actually looks like.",
};

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--co-enterprise)" }}>
        About
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold text-[var(--co-text)] mb-6 leading-tight">
        Built by people who&apos;ve worked the floor
      </h1>
      <p className="text-lg text-[var(--co-muted)] leading-relaxed mb-16 max-w-2xl">
        CivOps was founded by manufacturing operators, engineers, and technology executives
        who spent decades inside industrial organizations before building software for them.
        We know what a real shift looks like — and what makes operators trust a system or ignore it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            name: "Patrick Gaughan",
            title: "Co-Founder & Platform Lead",
            bio: "Pat brings 25+ years of manufacturing operations experience, having built and scaled operations across discrete, process, and batch environments. He designed the CivOps Platform architecture from the ground up with a single principle: if an operator won't use it on day one, it doesn't ship.",
          },
          {
            name: "Ryan Cahalane",
            title: "Co-Founder & Technology",
            bio: "Ryan has spent his career at the intersection of industrial operations and enterprise technology — from GE and Rockwell to OSIsoft and Axiom Manufacturing Systems. He leads the AI, data infrastructure, and integration architecture at CivOps.",
          },
          {
            name: "Hans",
            title: "Co-Founder & Operations",
            bio: "Hans brings deep domain expertise in manufacturing operations and organizational change, with experience guiding mid-market manufacturers through operational transformation across multiple industries and site footprints.",
          },
        ].map(({ name, title, bio }) => (
          <div key={name} className="flex flex-col gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
              style={{
                background: "color-mix(in srgb, var(--co-enterprise) 15%, var(--co-panel))",
                color: "var(--co-enterprise)",
                border: "1px solid color-mix(in srgb, var(--co-enterprise) 30%, var(--co-grid))",
              }}
            >
              {name[0]}
            </div>
            <div>
              <p className="font-bold text-[var(--co-text)]">{name}</p>
              <p className="text-xs text-[var(--co-muted)] mt-0.5">{title}</p>
            </div>
            <p className="text-sm text-[var(--co-muted)] leading-relaxed">{bio}</p>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl border border-[var(--co-grid)] bg-[var(--co-panel)] p-8 flex flex-col gap-4"
      >
        <p className="font-semibold text-[var(--co-text)]">CivOps LLC</p>
        <p className="text-sm text-[var(--co-muted)] leading-relaxed max-w-xl">
          We&apos;re based in Northeast Ohio — the heart of American manufacturing. We work directly
          with mid-market manufacturers to deploy CivOps, with hands-on support through
          initial configuration and go-live. No partner channel, no offshore implementation team.
        </p>
        <a
          href="mailto:ryan@civops.io"
          className="text-sm font-semibold transition-opacity hover:opacity-80 self-start"
          style={{ color: "var(--co-enterprise)" }}
        >
          ryan@civops.io →
        </a>
      </div>
    </main>
  );
}
