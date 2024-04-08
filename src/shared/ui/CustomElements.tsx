import { ButtonHTMLAttributes, InputHTMLAttributes, forwardRef } from "react";
import { Callout } from ".";
import { CustomButtonType } from "../model";
import { Link, LinkProps } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";

// 컴포넌트화한 HTML 요소

export const CustomInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & {label?: string}>(({
  type,
  placeholder,
  className,
  ...rest
}, ref) => {
  return (
    <div className="inline-flex flex-col gap-y-1">
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
        type={type ?? "text"}
        placeholder={
          placeholder ??
          type == "email" ? "이메일을 입력하세요" :
          type == "password" ? "비밀번호를 입력하세요" : ""
        }
        className={`${
          className ?? ''
        } ${
          type == "number" ? "number-appearance-none" : ""
        } ${
          type == "color" ? "color-appearance-none w-10 h-10" : `disabled:opacity-35 rounded py-[0.25em] px-[0.2em] border ${
            className?.includes("border-") ? '' : 'border-neutral-500 dark:border-neutral-300'
          }`
        } focus:outline-none focus:border-grapefruit-400 focus:border-2 disabled:cursor-not-allowed bg-[inherit]`}
      />
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
      className={`${
        btnstyle == "fab" ?
        `rounded-lg z-[9] absolute ${
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
              ''
              :
              ''
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

export const CustomLink = forwardRef<HTMLAnchorElement, LinkProps & {external?: boolean}>(({
  children,
  className,
  external,
  ...rest
}, ref) => {
  return (
    <Link
      {...rest}
      ref={ref}
      className={`${className ?? ''} underline inline-flex items-center gap-x-[0.25em]`}
      target={external ? "_blank" : undefined}
    >
      {external && <HiOutlineExternalLink />}
      {children}
    </Link>
  )
})