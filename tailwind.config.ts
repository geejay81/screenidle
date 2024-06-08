import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'screenidle-link': '#050A30',
        'screenidle-success': '#98FB98',
        'screenidle-danger': '#FF69B4',
        'screenidle-warning': '#DAF7A6',
      }
    },
  },
  plugins: [],
};
export default config;
