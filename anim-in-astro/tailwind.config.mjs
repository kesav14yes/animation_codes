import { COLORS, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT } from "./src/consts";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: COLORS,
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT,
    fontSize: FONT_SIZE,
    lineHeight: {
      100: "1",
      110: "1.1",
      120: "1.2",
      130: "1.3",
      140: "1.4",
      150: "1.5",
      200: "2",
    },
    extend: {
      flex: {
        0: "0",
        10: "0.1",
        20: "0.2",
        30: "0.3",
        40: "0.4",
        50: "0.5",
        60: "0.6",
        70: "0.7",
        80: "0.8",
        90: "0.9",
        100: "1",
      },
      borderRadius: {
        "50%": "50%",
        10: "10px",
      },
      content: {
        empty: '""',
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      boxShadow: {
        card: "0px 2px 37px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
