import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_SIZE } from "./og-cards";
import { LOGO_SRC } from "./site";

const logoDataUrl = `data:image/png;base64,${readFileSync(join(process.cwd(), "public", LOGO_SRC)).toString("base64")}`;

/** Shared Open Graph card: dark background, lime glow, logo and a headline. */
export function renderOgImage({ title, kicker }: { title: string; kicker: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 20%, rgba(141,255,87,0.28) 0%, rgba(16,185,129,0.12) 30%, #020617 62%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
          <img src={logoDataUrl} width={72} height={72} alt="" />
          <div style={{ fontSize: 40, fontWeight: 700, fontFamily: "monospace" }}>OnPacts</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 26, color: "#8DFF57", letterSpacing: 4, textTransform: "uppercase" }}>
            {kicker}
          </div>
          <div style={{ fontSize: title.length > 48 ? 60 : 72, fontWeight: 800, lineHeight: 1.08, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#94A3B8" }}>
          Commit. Perform. Deserve the Outcome · onpacts.com
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
