import { nextui } from '@nextui-org/theme'
import { color } from 'framer-motion'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        common: {
          50: "#ccffc4",
          100: "#9eff90",
          200: "#5fff50",
          300: "#29fe1d",
          400: "#07e500",
          500: "#00b800",
          600: "#008000",
          700: "#076d08",
          800: "#0b5c0d",
          900: "#003404",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          success: {
            foreground: "#fff",
            DEFAULT: "#008000"
          }
        }
      },
    }
  })],
}
