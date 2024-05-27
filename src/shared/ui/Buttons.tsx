import { ButtonHTMLAttributes, Children, forwardRef } from "react";
import { CommonButtonType, FABType } from "../model";
import { consoleWarn } from "../lib";

/** 배경 색이 들어가는 버튼을 위한 배경 색 클래스 생성 함수 */
const makeFilledClass = ({className, btncolor, dim}: {className?: string} & CommonButtonType) => {
  if(className?.includes("bg-")) return '';
  if(btncolor == "secondary" && dim) {
    consoleWarn({title: "secondary 컬러 버튼", desc: `secondary는 dim 여부가 적용되지 않습니다`});
  }

  const darkText = 'text-stone-900 dark:text-stone-50';
  const lightText = 'text-stone-50 dark:text-stone-900';
  let bgClass = '';

  switch (btncolor) {
    case "primary":
      bgClass =
        dim ?
          `bg-grapefruit-400/50 hover:bg-grapefruit-400/70 ${darkText}`
          :
          `bg-grapefruit-500 hover:bg-grapefruit-600 dark:bg-grapefruit-600 dark:hover:bg-grapefruit-400 ${lightText}`;
      break;
    case "secondary":
      bgClass =
          `bg-red-800/10 dark:bg-red-200/20 hover:bg-red-800/20 dark:hover:bg-red-200/30 ${darkText}`;
      break;
    case "tertiary":
      bgClass =
        dim ?
          `bg-indigo-400/50 hover:bg-indigo-400/70 ${darkText}`
          :
          `bg-indigo-700 dark:bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-indigo-400 ${lightText}`;
      break;
    default:
      bgClass = `bg-neutral-400/25 hover:bg-neutral-400/50 dark:hover:bg-neutral-400/35 ${darkText}`;
      break;
  }

  return bgClass;
}

/** 스타일 없는 버튼 래퍼 */
export const BasicButton = forwardRef<
HTMLButtonElement,
ButtonHTMLAttributes<HTMLButtonElement> & Pick<CommonButtonType, "modal">
>(({
  modal,
  type,
  title,
  children,
  className,
  ...rest
}, ref) => {
  return (
    <button
      {...rest}
      type={type ?? "button"}
      ref={ref}
      title={title ?? (typeof children == "string" ? children : rest["aria-label"] ?? 'click')}
      className={`inline-flex items-center justify-center ${
          // font weight
          className?.includes("font-") ? '' : `font-semibold`
        } transition-all disabled:opacity-30 disabled:cursor-not-allowed tracking-wide [&_svg]:size-[1.2em] ${
          // button for modal
          modal ? 'modal-btn' : ""
        } ${
          className ?? ''
        }`}
    >
      {children}
    </button>
  )
})

/** Float Action Button */
export const FAB = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & FABType
>(({
  type,
  children,
  title,
  className,
  position,
  btncolor,
  dim,
  modal,
  size,
  extended,
  ...rest
}, ref) => {
  const childCount = Children.count(children);
  if(
    (childCount > 1 || (typeof children == "string")) &&
    !extended
  ) {
    consoleWarn({
      title: `FAB 스타일`,
      desc: `직사각 형태의 버튼은 조금 덜 둥근 곡률이 잘 어울릴 수 있습니다.\n곡률 설정을 변경하려면 "extended" 옵션을 켜 주세요`
    });
  }

  return (
    <BasicButton
      {...rest}
      type={type}
      ref={ref}
      title={title}
      className={`${
        className?.includes("font-") ? '' : "font-bold"
      } ${
        extended ? "rounded-lg" : "rounded-full"
      } absolute ${
        // FAB position
        position?.includes("t") ? "top-5" : ""
      } ${
        (!position || position?.includes("b")) ? "bottom-5" : ""
      } ${
        position?.includes("m") ? 'top-1/2 -translate-y-1/2' : ""
      } ${
        position?.includes("l") ? 'left-5' : ''
      } ${
        (!position || position?.includes("r")) ? "right-5" : ""
      } ${
        position?.includes("c") ? "left-1/2 -translate-x-1/2" : ""
      } ${
        // background color
        makeFilledClass({className, btncolor: btncolor ?? "primary", dim})
      } ${
        // size
        size == "lg" ?
          `text-[1.5em] gap-x-[0.625em] ${extended ? 'py-[0.75em] px-[1em]' : 'p-[1em]'}`
          :
          `text-[1.125em] gap-x-[0.5em] ${extended ? 'py-[0.5em] px-[0.75em]' : 'p-[0.75em]'}`
      }`}
      modal={modal}
    >
      {children}
    </BasicButton>
  )
})

/** 일반적인 버튼 */
export const FilledButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & CommonButtonType
>(({
  children,
  type,
  title,
  className,
  btncolor,
  dim,
  modal,
  size,
  ...rest
}, ref) => {
  return (
    <BasicButton
      {...rest}
      ref={ref}
      modal={modal}
      type={type}
      title={title}
      className={`${
        // font weight
        className?.includes("font-") ? '' : (
          size == "lg" ?
            `font-bold` : `font-semibold`
        )
      } ${
        // background color
        makeFilledClass({className, btncolor, dim})
      } ${
        // radius
        className?.includes("rounded-") ? '' : (
          size == "lg" ? "rounded-lg":
          size == "sm" ? "rounded" :
          "rounded-md"
        )
      } ${
        // size
        size == "lg" ?
          `text-[1.5em] gap-x-[0.625em] py-[0.75em] px-[1em]` :
        size == "sm" ?
          `text-[0.9375em] gap-x-[0.375em] py-[0.375em] px-[0.625em]` :
          "text-[1.125em] gap-x-[0.5em] py-[0.5em] px-[0.75em]"
      }`}
    >
      {children}
    </BasicButton>
  )
})