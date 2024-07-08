import type { Theme } from "./models";

export const DARK_TEXT =
  "text-stone-900 dark:text-stone-50";
export const LIGHT_TEXT =
  "text-stone-50 dark:text-stone-900";

export const FILLED_BUTTON_THEME = {
  primary: {
    dim: `bg-grapefruit-400/50 hover:bg-grapefruit-400/70 ${DARK_TEXT}`,
    DEFAULT: `bg-grapefruit-500 hover:bg-grapefruit-600 dark:bg-grapefruit-600 dark:hover:bg-grapefruit-400 ${LIGHT_TEXT}`,
  },
  secondary: {
    DEFAULT: `bg-red-800/10 dark:bg-red-200/20 hover:bg-red-800/20 dark:hover:bg-red-200/30 ${DARK_TEXT}`,
  },
  tertiary: {
    dim: `bg-indigo-400/50 hover:bg-indigo-400/70 ${DARK_TEXT}`,
    DEFAULT: `bg-indigo-700 dark:bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-indigo-400 ${LIGHT_TEXT}`,
  },
  default: {
    DEFAULT: `bg-neutral-400/25 hover:bg-neutral-400/50 dark:hover:bg-neutral-400/35 ${DARK_TEXT}`,
  },
} as Theme;
