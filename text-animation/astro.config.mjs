// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import { defaultConfig } from "tailwind-variants";
import { COLORS } from "./src/consts/colors.const";
import { BASE_URL } from "./src/consts/page.const.ts";
import {
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
} from "./src/consts/font.const.ts";

export default defineConfig({
  integrations: [tailwind()],
  base: BASE_URL,
  build: {
    assetsPrefix: BASE_URL,
  },
  devToolbar: {
    enabled: false,
  },
});

defaultConfig.twMergeConfig = {
  classGroups: {
    "font-size": [
      {
        text: Object.keys(FONT_SIZE),
      },
    ],
    "font-weight": [
      {
        font: Object.keys(FONT_WEIGHT),
      },
    ],
    "font-family": [
      {
        font: Object.keys(FONT_FAMILY),
      },
    ],
    "text-color": [
      {
        text: Object.keys(COLORS),
      },
    ],
  },
};
