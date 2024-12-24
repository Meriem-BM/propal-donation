import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2AAA8A",
        secondary: "#00A36C",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "grid": "url('/images/grid.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
