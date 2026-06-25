import { ImageResponse } from "next/og"

export const alt = "Projet — Mahamane Daouda Maiga"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

const TYPE_COLORS: Record<string, string> = {
  PROFESSIONAL: "#3b82f6",
  CONSULTING: "#8b5cf6",
  ACADEMIC: "#f59e0b",
  PERSONAL: "#10b981",
}

const TYPE_LABELS: Record<string, string> = {
  PROFESSIONAL: "Expérience pro",
  CONSULTING: "Mission conseil",
  ACADEMIC: "Académique",
  PERSONAL: "Projet personnel",
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let title = slug
  let summary = ""
  let project_type = ""

  try {
    const res = await fetch(`${API}/api/projects/${slug}/`, { cache: "no-store" })
    if (res.ok) {
      const project = await res.json()
      title = project.title
      summary = project.summary
      project_type = project.project_type
    }
  } catch {}

  const color = TYPE_COLORS[project_type] ?? "#6366f1"
  const typeLabel = TYPE_LABELS[project_type]

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#09090b",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          borderLeft: `8px solid ${color}`,
        }}
      >
        {typeLabel && (
          <span
            style={{
              display: "inline-flex",
              padding: "6px 16px",
              borderRadius: "999px",
              background: `${color}22`,
              color,
              fontSize: "18px",
              fontWeight: 600,
              marginBottom: "32px",
              border: `1px solid ${color}44`,
              width: "fit-content",
            }}
          >
            {typeLabel}
          </span>
        )}

        <div
          style={{
            color: "#fafafa",
            fontSize: "58px",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "20px",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </div>

        {summary && (
          <div
            style={{
              color: "#a1a1aa",
              fontSize: "24px",
              lineHeight: 1.5,
              maxWidth: "900px",
            }}
          >
            {summary}
          </div>
        )}

        <div
          style={{
            marginTop: "auto",
            color: "#6366f1",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Mahamane Daouda Maiga — Portfolio
        </div>
      </div>
    ),
    { ...size },
  )
}
