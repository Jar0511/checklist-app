import { atomWithStorage } from "jotai/utils";
import { ThemeType } from "./models";

export const currentThemeAtom = atomWithStorage<ThemeType>("current_theme", "light");