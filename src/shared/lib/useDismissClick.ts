import { useEffect, useRef } from "react";

export const useDismissClick = (
	/** 유효 영역의 selector */
	containerClass: string,
	/** 닫는 상태로 변경하는 콜백 */
	close: () => void
) => {
	const savedCallback = useRef(close);

	useEffect(() => {
		savedCallback.current = close;
	}, [close]);

	useEffect(() => {
		const checkTarget = (e: MouseEvent) => {
			if(e.target instanceof Element) {
				if(e.target.closest(containerClass) == null) {
					savedCallback.current();
				}
			}
		};
		document.addEventListener("click", checkTarget);

		return () => {
			document.removeEventListener("click", checkTarget);
		}
	}, [containerClass]);
}