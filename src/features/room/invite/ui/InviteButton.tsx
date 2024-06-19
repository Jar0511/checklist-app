import {
	BasicButton,
	FilledButton,
	Modal,
	TabPanel,
} from "@/shared/ui";
import { useState, type ButtonHTMLAttributes } from "react";
import {
	MdAddLink,
	MdOutlineContentCopy,
} from "react-icons/md";

export const InviteButton = ({
	className,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const GenerateType = [
		{ children: "등록 시각 제한", value: "time" },
		{ children: "사용 횟수 제한", value: "count" },
	];
	const [type, setType] =
		useState<(typeof GenerateType)[number]["value"]>(
			"time"
		);
	const modalID = "create_invitation";
	return (
		<>
			<Modal modal_id={modalID} outsideClose>
				<h3>초대 코드 생성</h3>
				<TabPanel
					tabs={GenerateType}
					selectValue={type}
					setSelectValue={setType}
				/>
				<div>
					ㅋㅋ
					<FilledButton aria-label="copy">
						<MdOutlineContentCopy />
					</FilledButton>
				</div>
			</Modal>
			<BasicButton
				className={`${className ?? ""} flex items-center`}
				title="초대 코드 생성"
				modal={modalID}
			>
				멤버 초대하기
				<MdAddLink />
			</BasicButton>
		</>
	);
};
