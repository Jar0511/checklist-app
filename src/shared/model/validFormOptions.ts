export const required = {
	value: true,
	message: "값을 입력해 주세요",
};
export const trimmed = (v: unknown) =>
	typeof v == "string" ? v.trim() : v;
