import { fileURLToPath } from "url";
import path from "path";

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    qualities: [60, 65, 70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  modularizeImports: {
    "@mui/material/?(((w*)?/?)*)": {
      transform: "@mui/material/{{ matches.[1] }}/{{member}}",
    },
    "@mui/icons-material/?(((w*)?/?)*)": {
      transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
    },
  },
};
export default nextConfig;
