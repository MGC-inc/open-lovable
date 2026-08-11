import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The site ships its own hand-written stylesheet and pre-sized photography,
  // so plain <img> is used throughout instead of next/image.
  images: { unoptimized: true },
  // This app lives inside a larger repository that has its own lockfiles.
  // Pin the workspace root so module resolution and file tracing stay here.
  turbopack: { root: projectRoot },
  outputFileTracingRoot: projectRoot
};

export default nextConfig;
