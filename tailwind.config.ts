/* eslint-disable @typescript-eslint/no-require-imports */
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  // ...
  plugins: [
    // require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // <-- TAMBAHKAN INI
  ],
}

export default config