"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--co-grid)]/60 bg-[var(--co-ink)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/civops-wordmark.png"
            alt="CivOps"
            width={132}
            height={45}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--co-muted)]">
          <Link href="/#path" className="hover:text-[var(--co-text)] transition-colors">
            Approach
          </Link>
          <Link href="/#platform" className="hover:text-[var(--co-text)] transition-colors">
            Platform
          </Link>
          <Link href="/#product" className="hover:text-[var(--co-text)] transition-colors">
            Product
          </Link>
          <Link href="/#how-it-works" className="hover:text-[var(--co-text)] transition-colors">
            How It Works
          </Link>
          <Link href="/#who" className="hover:text-[var(--co-text)] transition-colors">
            Who It&apos;s For
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#demo"
            className="rounded-md px-4 py-2 text-sm font-semibold text-[var(--co-ink)] transition-opacity hover:opacity-90"
            style={{ background: "var(--co-enterprise)" }}
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[var(--co-muted)] hover:text-[var(--co-text)]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {open ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--co-grid)]/60 bg-[var(--co-panel)] px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/#path" onClick={() => setOpen(false)} className="text-[var(--co-muted)] hover:text-[var(--co-text)]">Approach</Link>
          <Link href="/#platform" onClick={() => setOpen(false)} className="text-[var(--co-muted)] hover:text-[var(--co-text)]">Platform</Link>
          <Link href="/#product" onClick={() => setOpen(false)} className="text-[var(--co-muted)] hover:text-[var(--co-text)]">Product</Link>
          <Link href="/#how-it-works" onClick={() => setOpen(false)} className="text-[var(--co-muted)] hover:text-[var(--co-text)]">How It Works</Link>
          <Link href="/#who" onClick={() => setOpen(false)} className="text-[var(--co-muted)] hover:text-[var(--co-text)]">Who It&apos;s For</Link>
          <div className="pt-2">
            <Link
              href="/#demo"
              onClick={() => setOpen(false)}
              className="block rounded-md px-4 py-2 text-center text-sm font-semibold text-[var(--co-ink)]"
              style={{ background: "var(--co-enterprise)" }}
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
