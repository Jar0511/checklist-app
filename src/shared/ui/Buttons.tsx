import { ButtonHTMLAttributes, forwardRef } from "react";
import { CustomButtonType } from "../model";

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
  modal,
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
        (!size || size == "md") ? `text-[1em] py-[0.5em] px-[0.75em]` : ""
      } ${
        size == "lg" ? `text-[1.5em] py-[0.75em] px-[1em]` : ""
      } ${
        size == "sm" ? `text-[0.875em] py-[0.5em] px-[0.75em]` : ''
      } inline-flex items-center justify-center gap-x-[0.5em] ${
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
      } ${modal ? 'modal-btn' : ""} transition-all disabled:opacity-30 disabled:cursor-not-allowed tracking-wide [&_svg]:size-[1.2em]`}
    >
      {children}
    </button>
  )
})