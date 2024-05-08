import { useAtom } from "jotai"
import { currentThemeAtom } from "../model/store"
import { useEffect } from "react";
import { CustomButton } from "@/shared/ui";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CustomButtonType } from "@/shared/model";

export const ThemeToggleButton = ({
  btnstyle = "fab",
  size = "lg"
}: {
  /** 기본적으로 FAB 스타일 */
  btnstyle?: CustomButtonType["btnstyle"]
  size?: CustomButtonType["size"]
}) => {
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
      size={size}
      btnstyle={btnstyle}
    >
      {theme == "light" ? <MdOutlineDarkMode className="pointer-events-none" /> : <MdOutlineLightMode className="pointer-events-none" />}
    </CustomButton>
  )
}