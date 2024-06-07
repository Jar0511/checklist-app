import { useAtomValue } from "jotai";
import { userInfoAtom } from "@/entities/user";
import { BasicButton, DropDownWrapper, ProfileIcon } from "@/shared/ui";
import { type ReactNode, useState } from "react";
import { useDismissClick } from "@/shared/lib";
import { ThemeToggleButton, currentThemeAtom } from "@/features/setting/theme";
import { LogoutButton } from "@/features/auth";

export const Header = ({logo, className, children}: {logo?: boolean; className?: string; children?: ReactNode;}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const userInfo = useAtomValue(userInfoAtom);

  useDismissClick('#user_menu_aria', () => setOpenMenu(false));
  return (
    <header className={`${className ?? ''} w-full sticky top-0 flex justify-center z-[9]`}>
      <div className="container flex flex-row-reverse justify-between items-center py-[12px]">
        <div id="user_menu_aria" className="relative">
          <BasicButton
            aria-label="open user menu"
            title="사용자 메뉴 열기"
            onClick={() => setOpenMenu(prev => !prev)}
            className={`rounded-full p-[4px] text-[1.125em] transition-all
              ${openMenu ? "bg-neutral-900/10 dark:bg-neutral-50/20" : ""}`
            }
          >
            <ProfileIcon url={userInfo?.user_profile} bg={userInfo?.profile_bg} />
          </BasicButton>
          {openMenu && <UserMenu />}
        </div>
        {children}
        {logo && <h1>logo</h1>}
      </div>
    </header>
  )
}

const UserMenu = () => {
  const darkMode = useAtomValue(currentThemeAtom);
  const userInfo = useAtomValue(userInfoAtom);
  return (
    <DropDownWrapper right={0}>
      <h2 className="font-bold cursor-default text-[1.0625rem] border-b border-solid border-neutral-200 dark:border-neutral-500 pb-[10px]">{userInfo?.user_nm}</h2>
      <ul className="text-[0.9375rem] flex flex-col gap-y-1 pt-[20px] hover:*:bg-neutral-900/10 dark:hover:*:bg-neutral-50/15 *:cursor-pointer *:px-[2px] *:rounded *:leading-6 *:transition-all">
        <li>내 정보</li>
        <li>
          <ThemeToggleButton fab={false} className="flex items-center justify-between w-full font-normal">
            <p>{darkMode == "light" ? "다크" : "라이트"}모드</p>
          </ThemeToggleButton>
        </li>
        <li>
          <LogoutButton className="justify-between w-full font-normal" />
        </li>
      </ul>
    </DropDownWrapper>
  )
}
