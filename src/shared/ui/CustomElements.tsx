import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, forwardRef } from "react";
import { Callout, ErrorMsg } from ".";
import { CustomButtonType, CustomLabelType } from "../model";
import { Link, LinkProps } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// 컴포넌트화한 HTML 요소

export const CustomInput = forwardRef<
HTMLInputElement,
InputHTMLAttributes<HTMLInputElement> & {label?: string, err?: string, showErr?: boolean}>(({
  type = "text",
  placeholder,
  className,
  err,
  showErr,
  ...rest
}, ref) => {
  return (
    <div className="flex flex-col w-full gap-y-1">
      {
        import.meta.env.MODE === "development" &&
        (type == "week" || type == "month") ?
        <Callout className="bg-amber-100">
          해당 타입은 브라우저마다 다른 입력값을 받을 수 있습니다(이 경고는 개발 모드에서만 표시됩니다).
        </Callout>
        :
        <></>
      }
      <input
        {...rest}
        ref={ref}
        type={type}
        placeholder={
          placeholder ??
          (type === "email" ? "이메일을 입력하세요" :
          (type === "password" ? "비밀번호를 입력하세요" : ""))
        }
        className={`${
          className ?? ''
        } ${
          type == "number" ? "number-appearance-none" : ""
        } ${
          type == "color" ? "color-appearance-none w-10 h-10" : `w-full disabled:opacity-35 rounded m-[auto_0] h-[2.125em] px-[0.5em] border ${
            className?.includes("border-") ? '' : 'border-neutral-500 dark:border-neutral-300'
          } ${err ? 'bg-red-500/25': ''}`
        } focus:outline-none focus:border-grapefruit-400 focus:border-2 box-border disabled:cursor-not-allowed bg-[inherit]`}
      />
      {(!!err && showErr) && <ErrorMsg>{err}</ErrorMsg>}
    </div>
  )
});

export const CustomButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonType>(({
  type,
  title,
  children,
  btnstyle,
  position,
  size,
  className,
  dim,
  btncolor,
  ...rest
}, ref) => {
  return (
    <button
      {...rest}
      type={type ?? "button"}
      ref={ref}
      title={title ?? (typeof children == "string" ? children : rest["aria-label"] ?? 'click')}
      className={`font-bold ${
        btnstyle == "fab" ?
        `rounded-lg z-[9] absolute${
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
          position?.includes("c") ? "left-1/2 -translate-y-1/2" : ""
        }`
        :
        "rounded-full"
      } ${
        // size
        (!size || size == "md") ? `text-[1em] p-[0.5em]` : ""
      } ${
        size == "lg" ? `text-[1.5em] p-[0.75em]` : ""
      } ${
        size == "sm" ? `text-[0.875em] p-[0.5em]` : ''
      } inline-flex items-center justify-center gap-x-[0.25em] ${
        className ?? ''
      } ${
        className?.includes("bg-") ?
        ''
        :
        // color
        `${
          (!btnstyle || btnstyle == "filled" || btnstyle == "fab") ?
          `${
            (!btncolor || btncolor == "primary") ?
              (
                dim ?
                'bg-grapefruit-400/50 hover:bg-grapefruit-400/70'
                :
                'bg-grapefruit-500 hover:bg-grapefruit-600 dark:bg-grapefruit-600 dark:hover:bg-grapefruit-400'
              )
            :
            ''
          } ${
            btncolor == "secondary" ?
              (
                dim ?
                'bg-red-800/10 dark:bg-red-200/10 hover:bg-red-800/20 dark:hover:bg-red-200/30'
                :
                'bg-red-950/70 dark:bg-red-100/50 hover:bg-red-950/80 dark:hover:bg-red-100/70'
              )
              :
              ''
          } ${
            btncolor == "tertiary" ?
            (
              dim ?
              'bg-purple-400/50 hover:bg-purple-400/70'
              :
              'bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-400'
            )
            :
            ''
          } ${
            dim ?
            'text-stone-900 dark:text-stone-50'
            :
            'text-stone-50 dark:text-stone-900'
          }`
          :
          ''
        }`
      } transition-all disabled:opacity-30 disabled:cursor-not-allowed tracking-wide`}
    >
      {children}
    </button>
  )
})

export const CustomLink = forwardRef<HTMLAnchorElement, LinkProps & {
  /** 외부 링크 */
  external?: boolean;
  /** 화살표 표시할 경우 방향 */
  arrow?: "left" | "right";
}>(({
  children,
  className,
  external,
  arrow,
  ...rest
}, ref) => {
  return (
    <Link
      {...rest}
      ref={ref}
      className={`${className ?? ''} underline inline-flex items-center gap-x-[0.25em] text-stone-600 dark:text-stone-400`}
      target={external ? "_blank" : undefined}
    >
      {arrow == "left" && <MdChevronLeft />}
      {external && <HiOutlineExternalLink />}
      {children}
      {arrow == "right" && <MdChevronRight />}
    </Link>
  )
})

export const CustomLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement> & CustomLabelType>(({
  children,
  direction,
  align,
  className,
  ...rest
}, ref) => {
  return (
    <div className="inline-flex flex-col gap-y-1">
      {
        import.meta.env.MODE === "development" &&
        !(Array.isArray(children) && children.some((child) => child.type === "span")) ?
        <Callout className="bg-amber-100">
          라벨 텍스트에 대한 스타일링은 <code>span</code>태그로 감싸야 적용됩니다(이 경고는 개발 모드에서만 표시됩니다).
        </Callout>
        :
        <></>
      }
      <label
        {...rest}
        ref={ref}
        className={`inline-flex ${
          (!direction || direction == "horizontal") ?
          `flex-row gap-x-[0.25em]`
          :
          `flex-col gap-y-[0.25em]`
        } ${
          (((!direction || direction == "horizontal") && !align) || align == "middle") ? "items-center" : ""
        } ${
          ((direction == "portrait" && !align) || align == "start") ? "items-start" : ""
        } ${
          align == "end" ? "items-end" : ""
        } ${
          className ?? ''
        } [&_span]:text-[0.875em] [&_span]:font-medium`}
      >
        {children}
      </label>
    </div>
  )
})