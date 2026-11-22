import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from /<repo>/, so the Pages build sets
 * NEXT_PUBLIC_BASE_PATH. Everywhere else (local dev, Freebuff Sites) it is unset
 * and the site stays at the domain root with a normal server build.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;
const isStaticExport = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  allowedDevOrigins: [
    "pv-f171c1a73585-2c9917a7-4b98-4f06-af72-776a204e6a65.style.dev",
  ],
};

export default nextConfig;
