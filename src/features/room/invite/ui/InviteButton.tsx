import {
	BasicButton,
	FilledButton,
	Modal,
} from "@/shared/ui";
import { type ButtonHTMLAttributes } from "react";
import {
	MdAddLink,
	MdOutlineContentCopy,
} from "react-icons/md";

export const InviteButton = ({
	className,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const modalID = "create_invitation";
	return (
		<>
			<Modal modal_id={modalID} outsideClose>
				<h3>초대 코드 생성</h3>
				<div>
					개발 중인 내용
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
