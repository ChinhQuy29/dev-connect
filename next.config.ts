import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Replace with your image domain
        port: "", // Leave empty if no specific port is required
        pathname: "/**", // Match all paths
      },
    ],
  },
};

export default nextConfig;