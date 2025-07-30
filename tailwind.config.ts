import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      Image: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryMain: "#00FB0A",
        primaryContrastText: "#005203",
        secondaryMain: "#8411CC",
        infoMain: "#0D95F9",
        infoContrastText: "#004C86",
        warningMain: "#FFA500",
        successMain: "#858080",
        errorMain: "#FF0000",
      },
    },
  },
  plugins: [],
};
export default config;
