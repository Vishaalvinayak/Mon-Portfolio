import { ImageResponse } from "next/og";
import { profile } from "@/content/resume";

// Next.js picks this file up automatically and adds og:image (and, with the twitter
// metadata in layout.tsx, twitter:image) — no manual <meta> tags or PNG to export.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 88px",
          background: "#05070a",
          backgroundImage: "radial-gradient(circle at 88% 12%, rgba(59,130,246,0.28), rgba(5,7,10,0) 55%)",
          color: "#e9edf3",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#3b82f6", marginBottom: 28 }}>$ whoami</div>

        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 1.05 }}>{profile.name}</div>

        <div style={{ display: "flex", fontSize: 44, color: "#3b82f6", marginTop: 20 }}>{profile.role}</div>

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginTop: 56,
            padding: "10px 24px",
            fontSize: 26,
            color: "#8b96a5",
            border: "1px solid rgba(59,130,246,0.5)",
            borderRadius: 999,
          }}
        >
          {profile.status}
        </div>
      </div>
    ),
    size,
  );
}
