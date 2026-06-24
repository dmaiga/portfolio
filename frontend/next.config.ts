import type { NextConfig } from "next";

// Le host des images (media Django) suit l'API : localhost en dev,
// domaine cPanel LWS en prod. Évite tout remotePattern codé en dur.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// En dev, le media Django est sur localhost (IP loopback). Next 16 bloque
// par défaut l'optimisation d'images depuis une IP privée (protection SSRF).
// On lève ce blocage UNIQUEMENT en développement ; en prod l'API est sur une
// IP publique (cPanel), donc on garde la protection active.
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${API_URL}/media/**`)],
    dangerouslyAllowLocalIP: isDev,
  },
};

export default nextConfig;
