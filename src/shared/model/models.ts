export type CustomButtonType = {
  /** 버튼 스타일 종류(기본 값: inline) */
  btnstyle?: "filled" | "outline" | "inline" | "fab";
  /** 버튼 사이즈(기본 값: md) */
  size?: "sm" | "md" | "lg";
  /** fab 버튼 위치(y: top - middle - bottom, x: left - center - right, 기본값: br) */
  position?: "tl" | "tc" | "tr" | "ml" | "mc" | "mr" | "bl" | "bc" | "br";
  /** 버튼 색상 */
  btncolor?: "primary" | "secondary" | "tertiary" | "danger";
  /** 버튼 색상 채도 */
  dim?: boolean;
}

export type CustomLabelType = {
  /** 정렬 방향 */
  direction?: "horizontal" | "portrait";
  /** 교차 축 정렬 기준 */
  align?: "start" | "middle" | "end";
}