import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CivOps — The Enterprise OS for Manufacturing Operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#0A0F14",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,64,74,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(37,64,74,0.35) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Green glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-80px",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(61,220,151,0.14) 0%, transparent 65%)",
          }}
        />

        {/* Top: logo + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "2px solid #3DDC97",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "2.5px solid #3DDC97",
                  borderRightColor: "transparent",
                  transform: "rotate(-45deg)",
                }}
              />
            </div>
            <span style={{ color: "#F7FAFC", fontSize: "30px", fontWeight: "700", letterSpacing: "-0.5px" }}>
              CivOps
            </span>
          </div>

          {/* Domain pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: "100px",
              border: "1px solid rgba(61,220,151,0.35)",
              background: "rgba(61,220,151,0.07)",
            }}
          >
            <span style={{ color: "#3DDC97", fontSize: "18px", fontWeight: "600" }}>civops.io</span>
          </div>
        </div>

        {/* Bottom: headline + sub */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ color: "#F7FAFC", fontSize: "72px", fontWeight: "800", lineHeight: "1.0", letterSpacing: "-2px" }}>
              The Enterprise OS
            </span>
            <span style={{ color: "#3DDC97", fontSize: "72px", fontWeight: "800", lineHeight: "1.0", letterSpacing: "-2px" }}>
              for Manufacturing Operations
            </span>
          </div>

          {/* Feature pills */}
          <div style={{ display: "flex", gap: "12px" }}>
            {["Role-specific HMI", "Batch execution", "AI agents", "OPC-UA integration"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span style={{ color: "#B6C8D1", fontSize: "17px", fontWeight: "500" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
