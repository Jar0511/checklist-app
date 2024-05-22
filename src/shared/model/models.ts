import { ReactNode } from "react";

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
  /** 필수값 여부 */
  required?: boolean;
}

type CommonModal = {
  /** 배경 클릭으로 모달을 닫을 수 있는지 여부 */
  outsideClose?: boolean;
  /** 상단 닫기 버튼 제거 여부: 이 값이 활성화되면 outsideClose는 무시됩니다 */
  noDismiss?: boolean;
  /** 내용물 */
  children?: ReactNode;
  /** 내용 - 버튼 사이에 위치하는 콘텐츠 */
  bottomContent?: ReactNode;
  /** 하단 버튼 목록 */
  actionButtons?: ReactNode;
  /** 하단 버튼 정렬 방향 */
  btnDirection?: "x" | "y";
  /** 로딩 상태 */
  loading?: boolean;
  /** 내용물 정렬 방향 */
  align?: "left" | "center" | "right";
}

type BasicModal = {
  type?: "basic"
  /** 백그라운드 색상: only promotion */
  bgColor?: undefined;
  /** 백그라운드 이미지 url: only promotion */
  bgImg?: undefined;
}

type PromotionModal = {
  type: "promotion",
  /** 백그라운드 색상: only promotion */
  bgColor?: string;
  /** 백그라운드 이미지 url: only promotion */
  bgImg?: string;
}

export type ModalType = CommonModal & (BasicModal | PromotionModal)