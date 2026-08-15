import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The user's home directory contains an unrelated package-lock.json; pin the
  // tracing root to this project so Next.js doesn't pick up the wrong one.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
