import { userAtom } from "@/entities/auth";
import { getRoomMembers } from "@/features/room/info";
import { useDismissClick, useFetch } from "@/shared/lib";
import type { Tables } from "@/shared/model/supabase";
import {
	BasicButton,
	DropDownWrapper,
	SkeletonWrapper,
} from "@/shared/ui";
import { AnimatePresence } from "framer-motion";
import { useAtomValue } from "jotai";
import {
	type HTMLAttributes,
	Suspense,
	useState,
} from "react";
import { FaHouseUser, FaUserGroup } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { PiCalendarStarFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const AdditionalInfo = ({
	children,
	...rest
}: HTMLAttributes<HTMLSpanElement>) => (
	<span
		{...rest}
		className="cursor-default flex items-center gap-x-[6px] text-neutral-500 dark:text-neutral-300 text-[0.875rem]"
	>
		{children}
	</span>
);

const MemberCount = ({ _id }: { _id: number }) => {
	const _members = useFetch(getRoomMembers, _id);
	return (
		<>
			<FaUserGroup />
			{_members?.members.length}
		</>
	);
};

export const RoomCard = ({
	_id,
	room_nm,
	room_desc,
	room_owner_id,
	current_banner_id,
	room_owner_nm,
}: Partial<Tables<"room">> & {
	room_owner_nm?: string | null;
}) => {
	if (!_id) throw new Error("_id 값 누락");

	const session = useAtomValue(userAtom);
	const [openMenu, setOpenMenu] = useState(false);

	useDismissClick(`.card_menu_container`, () =>
		setOpenMenu(false)
	);

	return (
		<div className="border border-solid rounded shadow-sm border-neutral-200 dark:border-neutral-400 px-[20px] leading-tight flex sm:flex-row flex-col sm:items-center gap-[16px] dark:bg-stone-800">
			<Link
				to={`/room/${_id}`}
				className="py-[16px] flex-1 flex sm:flex-row flex-col sm:items-center gap-[16px] cursor-pointer"
			>
				<div className="flex items-center sm:gap-[16px] gap-[8px] max-w-[40%]">
					<span
						title={
							current_banner_id ? "프로필 뽑기 진행 중" : ""
						}
						className="w-[1.25rem] h-[1.25rem] inline-flex self-start items-center justify-center"
					>
						<PiCalendarStarFill
							className={`size-[1.25rem] ${current_banner_id ? "fill-grapefruit-500 dark:fill-grapefruit-700" : "fill-neutral-400 dark:fill-neutral-400"} `}
						/>
					</span>
					<h2 className="font-bold dark:text-white">
						{room_nm}
					</h2>
				</div>
				<p className="flex-1 text-[0.9375rem]">
					{room_desc}
				</p>
			</Link>

			<div className="flex sm:gap-[16px] gap-[10px] items-cetner">
				<AdditionalInfo title="방장">
					<FaHouseUser />
					{session?.user.id == room_owner_id
						? "나"
						: room_owner_nm ?? "(알 수 없는 사용자)"}
				</AdditionalInfo>
				<Suspense
					fallback={
						<SkeletonWrapper className="flex items-center">
							<div className="w-8 h-4" />
						</SkeletonWrapper>
					}
				>
					<AdditionalInfo title="참여자 수">
						<MemberCount _id={_id} />
					</AdditionalInfo>
				</Suspense>
				<div className="relative ">
					<BasicButton
						aria-label="toggle menu"
						className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-500 dark:text-neutral-300"
						onClick={(e) => {
							e.stopPropagation();
							setOpenMenu((prev) => !prev);
						}}
					>
						<HiOutlineDotsHorizontal />
					</BasicButton>
					<AnimatePresence>
						{openMenu && (
							<DropDownWrapper
								width={"100px"}
								top={"90%"}
								right={0}
								className={`*:px-2 card_menu_container`}
							>
								<p>메뉴</p>
							</DropDownWrapper>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};
