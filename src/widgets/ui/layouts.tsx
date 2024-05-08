import { useAtomValue } from "jotai";
import { userInfoAtom } from "@/entities/user";
import { ProfileIcon } from "@/shared/ui";
import { ReactNode } from "react";

export const Header = ({children}: {children?: ReactNode}) => {
  const userInfo = useAtomValue(userInfoAtom);
  return (
    <header className={`w-full fixed top-0 flex items-center flex-row-reverse bg-yellow-50`}>
      <ProfileIcon url={userInfo?.user_profile} bg={userInfo?.profile_bg} />
      {children}
    </header>
  )
}
