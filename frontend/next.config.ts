import type { NextConfig } from "next";

// Le host des images (media Django) suit l'API : localhost en dev,
// domaine cPanel LWS en prod. Évite tout remotePattern codé en dur.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${API_URL}/media/**`)],
  },
};

export default nextConfig;
