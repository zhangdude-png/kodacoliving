import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev HMR socket only trusts the hostname the server was started as
  // (localhost). The preview is opened on 127.0.0.1, which must be allowed
  // or the client runtime never finishes hydrating.
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
