
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'cosmetic-home' : "var(--cosmetic-background)",
        'i04' : "var(--I04)",
        'i05' : "var(--I05)",
        'contact-us' : "var(--contact-us)",

      },
      colors: {
        primary: "var(--clr-primary)",
        secondary: "var(--clr-secondary)",
        "primary-light": "var(--clr-primary-light)",
        'secondary-light': "var(--clr-secondary-light)",

      }
    },
  },
  plugins: [],
};
export default config;
