import { useAtomValue } from "jotai";
import { userInfoAtom } from "@/entities/user";
import {
	BasicButton,
	DropDownWrapper,
	ProfileIcon,
} from "@/shared/ui";
import { type ReactNode, useState } from "react";
import { useDismissClick } from "@/shared/lib";
import { ThemeToggleButton } from "@/features/setting/theme";
import { LogoutButton } from "@/features/auth";
import { roomInfoAtom } from "@/entities/room";
import { userAtom } from "@/entities/auth";
import { InviteButton } from "@/features/room/invite";
import { AnimatePresence } from "framer-motion";

export const Header = ({
	logo,
	className,
	children,
}: {
	logo?: boolean;
	className?: string;
	children?: ReactNode;
}) => {
	const [openMenu, setOpenMenu] = useState(false);
	const userInfo = useAtomValue(userInfoAtom);

	useDismissClick(".user_menu_aria", () =>
		setOpenMenu(false)
	);
	return (
		<header
			className={`${className ?? ""} w-full sticky top-0 flex justify-center z-[9]`}
		>
			<div className="container flex flex-row-reverse justify-between items-center py-[12px]">
				<div className="relative user_menu_aria">
					<BasicButton
						aria-label="open user menu"
						title="사용자 메뉴 열기"
						onClick={() => setOpenMenu((prev) => !prev)}
						className={`rounded-full p-[4px] text-[1.125em] transition-all
              ${openMenu ? "bg-neutral-900/10 dark:bg-neutral-50/20" : ""}`}
					>
						<ProfileIcon
							url={userInfo?.user_profile}
							bg={userInfo?.profile_bg}
						/>
					</BasicButton>
					<AnimatePresence>
						{openMenu && <UserMenu />}
					</AnimatePresence>
				</div>
				{children}
				{logo && <h1>logo</h1>}
			</div>
		</header>
	);
};

const UserMenu = () => {
	const userSession = useAtomValue(userAtom);
	const userInfo = useAtomValue(userInfoAtom);
	const currentRoomInfo = useAtomValue(roomInfoAtom);
	const listButtonClass =
		"justify-between w-full font-normal";

	return (
		<DropDownWrapper right={0}>
			<h2 className="font-bold cursor-default text-[1.0625rem] border-b border-solid border-neutral-200 dark:border-neutral-400 pb-[10px]">
				{userInfo?.user_nm}
			</h2>
			<ul className="text-[0.9375rem] flex flex-col gap-y-1 pt-[20px] hover:*:bg-neutral-900/10 dark:hover:*:bg-neutral-50/15 *:cursor-pointer *:px-[2px] *:rounded *:leading-6 *:transition-all">
				<li>내 정보</li>
				<li>
					<ThemeToggleButton
						fab={false}
						className={listButtonClass}
					/>
				</li>
				<li>
					<LogoutButton className={listButtonClass} />
				</li>
				{currentRoomInfo?.room_owner_id ==
					userSession?.user.id && (
					<li>
						<InviteButton className={listButtonClass} />
					</li>
				)}
			</ul>
		</DropDownWrapper>
	);
};
