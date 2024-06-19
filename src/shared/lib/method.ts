// js 내장 메소드 기반의 일반적인 함수들
export const containsByClassName = (
	ele: Element,
	className: string
) => {
	return (
		!!ele.closest(className) ||
		(ele.getAttribute("className")
			? ele.getAttribute("className")!.includes(className)
			: false)
	);
};
