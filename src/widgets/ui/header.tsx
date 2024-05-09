import { useAtomValue } from "jotai";
import { userInfoAtom } from "@/entities/user";
import { ProfileIcon } from "@/shared/ui";
import { ReactNode, useState } from "react";
import { useDismissClick } from "@/shared/lib";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { ThemeToggleButton } from "@/features/setting/theme";
import { currentThemeAtom } from "@/features/setting/theme/model/store";

export const Header = ({children}: {children?: ReactNode}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const userInfo = useAtomValue(userInfoAtom);

  useDismissClick('#user_menu_aria', () => setOpenMenu(false));
  return (
    <header className={`w-full sticky top-0 flex justify-center`}>
      <div className="container flex flex-row-reverse justify-between items-center py-[12px]">
        <div id="user_menu_aria" className="relative">
          <button
            type="button"
            aria-label="open user menu"
            title="사용자 메뉴 열기"
            onClick={() => setOpenMenu(prev => !prev)}
            className={`rounded-full p-[4px] transition-all
              ${openMenu ? " bg-neutral-900/10 dark:bg-neutral-50/20" : ""}`
            }
          >
            <ProfileIcon url={userInfo?.user_profile} bg={userInfo?.profile_bg} />
          </button>
          {openMenu &&
            <AnimatePresence>
              <UserMenu />
            </AnimatePresence>
          }
        </div>
        {children}
      </div>
    </header>
  )
}

const Container: Variants = {
  hidden: {
    opacity: 1,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
const Item: Variants = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
}

const UserMenu = () => {
  const darkMode = useAtomValue(currentThemeAtom);
  const userInfo = useAtomValue(userInfoAtom);
  return (
    <motion.div
      className="absolute shadow-md mt-[2px] border border-solid border-neutral-200 dark:border-neutral-500 bg-white dark:bg-stone-700 rounded-md py-[12px] w-[200px] right-0 z-[9]"
      variants={Container}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={Item} className="flex flex-col *:px-[16px]">
        <h2 className="font-bold cursor-default text-[1.0625rem] border-b border-solid border-neutral-200 dark:border-neutral-500 pb-[10px]">{userInfo?.user_nm}</h2>
        <ul className="text-[0.9375rem] flex flex-col gap-y-1 pt-[20px] hover:*:bg-neutral-900/10 dark:hover:*:bg-neutral-50/15 *:cursor-pointer *:px-[2px] *:rounded *:leading-6 *:transition-all">
          <li>내 정보</li>
          <li>
            <label className="flex items-center justify-between cursor-pointer">
              <p>{darkMode == "light" ? "다크" : "라이트"}모드</p>
              <ThemeToggleButton btnstyle="inline" size="md" />
            </label>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}
