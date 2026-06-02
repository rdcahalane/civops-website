import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--co-grid)]/60 bg-[var(--co-panel)] mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Image
            src="/civops-wordmark.png"
            alt="CivOps"
            width={150}
            height={51}
          />
          <p className="text-sm leading-6 text-[var(--co-muted)] max-w-xs">
            The enterprise operations platform built for mid-market manufacturers — from the plant floor up.
          </p>
          <address className="not-italic text-sm text-[var(--co-muted)]/70 leading-5">
            CivOps LLC<br />
            Northeast Ohio, USA
          </address>
        </div>

        {/* Platform links */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--co-muted)]/60 mb-4">Platform</p>
          <ul className="flex flex-col gap-3 text-sm text-[var(--co-muted)]">
            <li><Link href="/#platform" className="hover:text-[var(--co-text)] transition-colors">Capabilities</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-[var(--co-text)] transition-colors">How It Works</Link></li>
            <li><Link href="/#who" className="hover:text-[var(--co-text)] transition-colors">Who It&apos;s For</Link></li>
            <li><Link href="/about" className="hover:text-[var(--co-text)] transition-colors">About</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--co-muted)]/60 mb-4">Get Started</p>
          <ul className="flex flex-col gap-3 text-sm text-[var(--co-muted)]">
            <li>
              <Link href="/#demo" className="hover:text-[var(--co-enterprise)] transition-colors">
                Request a Demo
              </Link>
            </li>
            <li>
              <a href="mailto:ryan@civops.io" className="hover:text-[var(--co-text)] transition-colors">
                ryan@civops.io
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--co-grid)]/40 mx-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--co-muted)]/50">
        <p>© {year} CivOps LLC. All rights reserved.</p>
        <p>civops.io</p>
      </div>
    </footer>
  );
}
