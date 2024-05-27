import { useAtom } from "jotai"
import { currentThemeAtom } from "../model/store"
import { HTMLAttributes, useEffect } from "react";
import { BasicButton, FAB } from "@/shared/ui";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FABType } from "@/shared/model";

export const ThemeToggleButton = ({
  fab = true,
  size = "lg",
  children,
  ...rest
}:
  Partial<FABType> &
  {fab?: boolean} &
  HTMLAttributes<HTMLButtonElement>
) => {
  const [theme, setTheme] = useAtom(currentThemeAtom);

  useEffect(() => {
    if(theme == "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [theme]);

  if(fab) {
    return (
      <FAB
        onClick={() => setTheme(pre => pre == "light" ? "dark" : "light")}
        size={size}
        aria-label="toggle app theme"
        {...rest}
      >
        {theme == "light" ? <MdOutlineDarkMode className="pointer-events-none" /> : <MdOutlineLightMode className="pointer-events-none" />}
      </FAB>
    )
  } else {
    return (
      <BasicButton
        onClick={() => setTheme(pre => pre == "light" ? "dark" : "light")}
        aria-label="toggle app theme"
        {...rest}
      >
        {children}
        {theme == "light" ? <MdOutlineDarkMode className="pointer-events-none" /> : <MdOutlineLightMode className="pointer-events-none" />}
      </BasicButton>
    )
  }
}