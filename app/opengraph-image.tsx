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
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 80px",
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
              "linear-gradient(rgba(37,64,74,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,64,74,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(61,220,151,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Logo wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            {/* Symbol circle */}
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                border: "2px solid #3DDC97",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  border: "2px solid #3DDC97",
                  borderRightColor: "transparent",
                  transform: "rotate(-45deg)",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#F7FAFC", fontSize: "28px", fontWeight: "700", letterSpacing: "-0.5px", lineHeight: 1 }}>
                CivOps
              </span>
              <span style={{ color: "#3DDC97", fontSize: "11px", fontWeight: "600", letterSpacing: "2px", marginTop: "3px" }}>
                LLC
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <span style={{ color: "#F7FAFC", fontSize: "56px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-1.5px" }}>
              The Enterprise OS
            </span>
            <span style={{ color: "#3DDC97", fontSize: "56px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-1.5px" }}>
              for Manufacturing
            </span>
            <span style={{ color: "#3DDC97", fontSize: "56px", fontWeight: "800", lineHeight: "1.05", letterSpacing: "-1.5px" }}>
              Operations
            </span>
          </div>

          {/* Sub */}
          <span style={{ color: "#B6C8D1", fontSize: "22px", fontWeight: "400", lineHeight: "1.4", maxWidth: "680px" }}>
            Role-specific HMI · Batch execution · AI agents · OPC-UA integration
          </span>

          {/* Domain tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid rgba(61,220,151,0.3)",
              background: "rgba(61,220,151,0.08)",
              alignSelf: "flex-start",
            }}
          >
            <span style={{ color: "#3DDC97", fontSize: "16px", fontWeight: "600" }}>civops.io</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
