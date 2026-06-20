import { ImageResponse } from "next/og"

export const alt = "Mahamane Daouda Maiga — Portfolio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#09090b",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "8px",
            height: "100%",
            background: "#6366f1",
          }}
        />

        {/* Domaines */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
          {["Data Engineering", "Business Intelligence", "Systèmes d'Information"].map((d) => (
            <span
              key={d}
              style={{
                color: "#818cf8",
                fontSize: "16px",
                fontWeight: 500,
                padding: "4px 12px",
                borderRadius: "999px",
                border: "1px solid #3730a3",
                background: "#1e1b4b40",
              }}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Nom */}
        <div
          style={{
            color: "#fafafa",
            fontSize: "68px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-1px",
          }}
        >
          Mahamane Daouda Maiga
        </div>

        {/* Titre */}
        <div style={{ color: "#a1a1aa", fontSize: "26px", fontWeight: 400 }}>
          Data Engineer &amp; Architecte Applicatif — Bamako, Mali
        </div>

        {/* Pied */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "#6366f1",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          mdmaiga.dev
        </div>
      </div>
    ),
    { ...size },
  )
}
