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
  /** 모달을 여는 버튼인지 여부 */
  modal?: boolean;
}

export type CustomLabelType = {
  /** 정렬 방향 */
  direction?: "horizontal" | "portrait";
  /** 교차 축 정렬 기준 */
  align?: "start" | "middle" | "end";
}

export type ModalType = {
  /** 배경 클릭으로 모달을 닫을 수 있는지 여부 */
  outsideClose?: boolean;
  /** 상단 닫기 버튼 제거 여부: 이 값이 활성화되면 outsideClose는 무시됩니다 */
  noDismiss?: boolean;
}