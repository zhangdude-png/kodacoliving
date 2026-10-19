import { ImageResponse } from "next/og";

export const alt = "Koda Coliving.AI — autonomous coliving operations for Singapore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1A0D2E",
          color: "white",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4 }}>
          KODA COLIVING.AI
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            Autonomous coliving operations for Singapore
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#E4D4F7" }}>
            Operators · 5 to 100 rooms · Landlords · St Francis case study
          </div>
        </div>
      </div>
    ),
    size,
  );
}
