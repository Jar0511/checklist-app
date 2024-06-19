import { useAtomValue, useSetAtom } from "jotai";
import { createPortal } from "react-dom";
import { type ModalType, modalShowAtom } from "../model";
import { useDismissClick } from "../lib";
import { BasicButton } from "./Buttons";
import { MdClose } from "react-icons/md";
import { Callout } from "./Contents";
import { LoadingFallback } from "./Fallbacks";

const ModalContainer = ({
	outsideClose,
	noDismiss,
	type,
	bgColor,
	children,
	bottomContent,
	btnDirection,
	actionButtons,
	loading,
	align,
}: ModalType) => {
	const setShow = useSetAtom(modalShowAtom);
	useDismissClick([".modal-container", ".modal-btn"], () =>
		outsideClose && !noDismiss && !loading
			? setShow(null)
			: null
	);

	return (
		<div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/50 backdrop-blur-sm">
			<div
				onClick={(e) => e.stopPropagation()}
				className="modal-container absolute -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 font-Pretendard text-neutral-900 dark:text-stone-50 dark:bg-neutral-800 dark:border dark:border-neutral-400 w-[288px] sm:w-[300px] md:w-[420px] rounded-xl h-auto max-h-[80vh] flex flex-col gap-8 items-center"
			>
				{loading && (
					<LoadingFallback className="absolute" blur />
				)}
				<div
					className={`flex flex-col ${bgColor ?? ""} w-full`}
				>
					{!noDismiss && (
						<div className="flex flex-row-reverse px-2 pt-2">
							<BasicButton
								aria-label="close"
								onClick={() => setShow(null)}
								className="p-2"
							>
								<MdClose className="size-6" />
							</BasicButton>
						</div>
					)}
					<div
						className={`px-10 ${type == "promotion" ? "h-[500px]" : "max-h-[500px]"} overflow-auto flex flex-col ${
							!align || align == "center"
								? "items-center"
								: align == "left"
									? "items-start"
									: "items-end"
						} gap-2 ${
							// 이미지 스타일링
							"[&_img]:order-[0]"
						} ${
							// 타이틀 스타일링
							"[&_h3]:font-bold [&_h3]:text-2xl [&_h3]:order-1"
						} ${
							// 텍스트 스타일링
							"[&_p]:text-neutral-500 dark:[&_p]:text-neutral-400 [&_p]:order-3"
						} *:order-last text-[0.9375rem]`}
					>
						{import.meta.env.MODE === "development" && (
							<Callout type="warn" className="w-full">
								스타일링 적용을 위해 아래의 규칙을
								지켜주세요
								<br />
								(이 경고는 개발 모드에서만 표시됩니다)
								<ol className="list-decimal list-inside">
									<li>
										타이틀은 <code>h3</code> 태그로
										감싸주세요
									</li>
									<li>
										설명문은 <code>p</code> 태그로
										감싸주세요
									</li>
									<li>
										아이콘은 <code>i</code> 태그로
										감싸주세요
									</li>
								</ol>
							</Callout>
						)}
						{children}
					</div>
				</div>

				{!!bottomContent && (
					<div className="text-[0.9375rem]">
						{bottomContent}
					</div>
				)}

				<div
					className={`flex ${!btnDirection || btnDirection == "x" ? "*:flex-1" : "flex-col items-stretch"} w-full px-10 pb-10`}
				>
					{actionButtons}
				</div>
			</div>
		</div>
	);
};

export const Modal = (props: ModalType) => {
	const show = useAtomValue(modalShowAtom);
	const portal = document.getElementById(
		"portal"
	) as Element;

	if (show && show == props.modal_id) {
		return (
			<>
				{createPortal(
					<ModalContainer {...props} />,
					portal
				)}
			</>
		);
	}
};
