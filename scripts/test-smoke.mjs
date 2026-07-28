#!/usr/bin/env node
/**
 * civops-website smoke test — real endpoints, no mocks.
 * Usage: node scripts/test-smoke.mjs [--url https://civops.io]
 * Override target: --url flag, or SMOKE_BASE_URL / CIVOPS_WEBSITE_URL / SMOKE_URL env.
 * Default target: https://civops.io (Vercel-deployed marketing site).
 * Exit 0 = pass, 1 = fail
 */

const BASE_URL = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : process.env.SMOKE_BASE_URL ||
    process.env.CIVOPS_WEBSITE_URL ||
    process.env.SMOKE_URL ||
    "https://civops.io";

const TIMEOUT = 30_000;

const results = [];
function pass(name) { results.push({ name, ok: true }); console.log(`  ✅ ${name}`); }
function fail(name, err) { results.push({ name, ok: false, err }); console.error(`  ❌ ${name}: ${err}`); }

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function run() {
  console.log(`\ncivops-website smoke test → ${BASE_URL}\n`);

  // 1. Home page returns 200 and HTML containing "CivOps"
  try {
    const r = await fetchWithTimeout(BASE_URL);
    const body = await r.text();
    if (r.status === 200 && body.includes("CivOps")) {
      pass("home page returns 200 with CivOps content");
    } else {
      fail("home page returns 200 with CivOps content", `HTTP ${r.status}, includesCivOps=${body.includes("CivOps")}`);
    }
  } catch (e) { fail("home page returns 200 with CivOps content", e.message); }

  // 2. /about returns 200 and HTML
  try {
    const r = await fetchWithTimeout(`${BASE_URL}/about`);
    const body = await r.text();
    if (r.status === 200 && (body.includes("<!DOCTYPE") || body.includes("<html"))) {
      pass("/about returns 200 with HTML");
    } else {
      fail("/about returns 200 with HTML", `HTTP ${r.status}`);
    }
  } catch (e) { fail("/about returns 200 with HTML", e.message); }

  // 3. POST /api/demo with empty body → 400 (validation rejects missing email;
  //    never actually sends a demo-request email since Resend requires `email`)
  try {
    const r = await fetchWithTimeout(`${BASE_URL}/api/demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (r.status === 400) {
      pass("POST /api/demo rejects empty body (HTTP 400)");
    } else {
      fail("POST /api/demo rejects empty body", `expected HTTP 400, got ${r.status}`);
    }
  } catch (e) { fail("POST /api/demo rejects empty body", e.message); }

  // 4. GET /api/demo (wrong method) → 405, route only accepts POST
  try {
    const r = await fetchWithTimeout(`${BASE_URL}/api/demo`, { method: "GET" });
    if (r.status === 405) {
      pass("GET /api/demo rejected (HTTP 405 — POST-only route)");
    } else {
      fail("GET /api/demo rejected", `expected HTTP 405, got ${r.status}`);
    }
  } catch (e) { fail("GET /api/demo rejected", e.message); }

  return report();
}

function report() {
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${passed}/${results.length} passed${failed ? `, ${failed} FAILED` : ""}\n`);
  if (failed) {
    results.filter(r => !r.ok).forEach(r => console.error(`  FAIL: ${r.name} — ${r.err}`));
    process.exit(1);
  }
  process.exit(0);
}

run().catch(e => { console.error("Smoke test crashed:", e); process.exit(1); });
