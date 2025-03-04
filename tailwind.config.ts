import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.tsx",
    "./pages/**/*.tsx"
  ],
  theme: {
    extends: {}
  },
  variants: {
    extends: {}
  },
  plugins: [],
  corePlugins: {
    preflight:false,
  },
}

