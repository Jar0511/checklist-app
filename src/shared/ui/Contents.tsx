import { forwardRef } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link, type LinkProps } from "react-router-dom";
import type { HTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";
import { FaUser } from "react-icons/fa6";

export const ProfileIcon = ({url, bg, size = "sm"}: {url?: string | null; size?: "lg" | "sm"; bg?: string | null}) => {
  return (
    <div
      className={`${
          size == "lg" ? "w-[56px] h-[56px]" : "w-[32px] h-[32px]"
        } rounded-full overflow-hidden flex items-end justify-center ${
          bg ? '' :"border border-solid border-neutral-400 dark:border-neutral-200"}
        `}
      style={{
        backgroundColor: bg ?? 'transparent'
      }}
    >
      {url ?
        <img src={url} /> :
        <FaUser className="size-[80%] fill-neutral-400 dark:fill-neutral-200" />
      }
    </div>
  )
}

export const Callout = ({icon: Icon, className, children}: {icon?: string | IconType ,className?: string; children?: ReactNode}) => {
  return (
    <div className={`${className ?? ''} ${className?.includes("bg-") ? '' : 'bg-neutral-200'} text-stone-900 rounded-md py-3 px-2 flex items-start gap-x-2`}>
      <div>{Icon ? (typeof Icon == "string" ? Icon : <Icon />) : '💡'}</div>
      <div className="flex-1 break-all whitespace-pre-line">{children}</div>
    </div>
  )
}

export const ErrorMsg = ({children, className, ...rest}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p {...rest} className={`text-[0.875em] font-normal text-red-500 ${className ?? ''}`}>{children}</p>
  )
}

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