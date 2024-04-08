import { useAtom } from "jotai"
import { currentThemeAtom } from "../model/store"
import { useEffect } from "react";

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
    <button onClick={() => setTheme(pre => pre == "light" ? "dark" : "light")}>click me</button>
  )
}