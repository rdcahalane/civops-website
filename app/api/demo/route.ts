import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, role, challenge } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      // Log and silently succeed during pre-Resend setup
      console.log("[demo-request]", { name, email, company, role, challenge });
      return NextResponse.json({ ok: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CivOps <noreply@notify.civops.io>",
        to: ["ryan@civops.io"],
        reply_to: email,
        subject: `Demo Request — ${company || email}`,
        text: [
          `Name: ${name || "—"}`,
          `Email: ${email}`,
          `Company: ${company || "—"}`,
          `Role: ${role || "—"}`,
          `Challenge: ${challenge || "—"}`,
        ].join("\n"),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[demo-request] Resend error:", err);
      return NextResponse.json({ error: "Send failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[demo-request]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
