import { BasicButton } from "@/shared/ui";
import { MdLogout } from "react-icons/md";
import { logOut } from "../api";
import { useSetAtom } from "jotai";
import {
	detectSessionAtom,
	userAtom,
} from "@/entities/auth";
import { userInfoAtom } from "@/entities/user";

export const LogoutButton = ({
	className,
}: {
	className?: string;
}) => {
	const setSession = useSetAtom(userAtom);
	const setUserInfo = useSetAtom(userInfoAtom);
	const setDetectSession = useSetAtom(detectSessionAtom);
	return (
		<BasicButton
			className={`${className ?? ""} flex items-center`}
			onClick={() => {
				logOut();
				setSession(null);
				setUserInfo(null);
				return setDetectSession(true);
			}}
			title="log out"
		>
			로그아웃
			<MdLogout />
		</BasicButton>
	);
};
