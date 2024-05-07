import { useAtom } from "jotai"
import { currentThemeAtom } from "../model/store"
import { useEffect } from "react";
import { CustomButton } from "@/shared/ui";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export const ThemeToggleButton = () => {
  const [theme, setTheme] = useAtom(currentThemeAtom);

  useEffect(() => {
    if(theme == "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [theme]);
  return (
    <CustomButton
      onClick={() => setTheme(pre => pre == "light" ? "dark" : "light")}
      aria-label="toggle app theme"
      size="lg"
      btnstyle="fab"
    >
      {theme == "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </CustomButton>
  )
}