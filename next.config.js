/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

const url = process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : 'localhost:3000';

/** @type {import("next").NextConfig} */
const config = {
  allowedDevOrigins: [url],
  experimental: {
    serverActions: {
      allowedOrigins: [url],
    },
  },
  output: 'standalone',
};

export default config;

