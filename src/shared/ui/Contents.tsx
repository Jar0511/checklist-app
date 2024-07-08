import { forwardRef } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  MdChevronLeft,
  MdChevronRight,
  MdError,
  MdLightbulb,
} from "react-icons/md";
import { Link, type LinkProps } from "react-router-dom";
import type { HTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";
import { FaUser } from "react-icons/fa6";

export const ProfileIcon = ({
  url,
  bg,
  size = "sm",
}: {
  url?: string | null;
  size?: "lg" | "sm";
  bg?: string | null;
}) => {
  return (
    <div
      className={`${
        size == "lg"
          ? "w-[56px] h-[56px]"
          : "w-[32px] h-[32px]"
      } rounded-full overflow-hidden flex items-end justify-center ${
        bg
          ? ""
          : "border border-solid border-neutral-400 dark:border-neutral-200"
      }
        `}
      style={{
        backgroundColor: bg ?? "transparent",
      }}
    >
      {url ? (
        <img src={url} />
      ) : (
        <FaUser className="size-[80%] fill-neutral-400 dark:fill-neutral-200" />
      )}
    </div>
  );
};

export const Callout = ({
  type,
  icon: Icon,
  className,
  children,
}: {
  /** 사전 정의 스타일 */
  type?: "warn" | "error";
  /** 커스텀 아이콘 */
  icon?: string | IconType;
  /** 커스텀 스타일링, border가 필요한 경우 여기에 명시(다크모드에선 기본으로 border 적용) */
  className?: string;
  /** 내용 */
  children?: ReactNode;
}) => {
  return (
    <div
      className={`${className ?? ""} ${
        className?.includes("bg-") ||
        className?.includes("border-")
          ? ""
          : type == "warn"
            ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-yellow-950 dark:text-amber-100 dark:border-amber-500"
            : type == "error"
              ? "bg-red-100 text-red-900 border-red-400 dark:bg-red-950 dark:text-red-100 dark:border-red-600"
              : "bg-neutral-200 text-stone-900 border-neutral-300 dark:bg-neutral-600 dark:text-stone-50 dark:border-neutral-400"
      } dark:border rounded-md py-3 px-2 flex items-start gap-x-2`}
    >
      <div className="rounded-full p-1 flex items-center justify-center]">
        {Icon ? (
          typeof Icon == "string" ? (
            Icon
          ) : (
            <Icon />
          )
        ) : type == "error" ? (
          <MdError className="text-red-500" />
        ) : (
          <MdLightbulb className="text-amber-500" />
        )}
      </div>
      <div className="flex-1 break-all whitespace-pre-line">
        {children}
      </div>
    </div>
  );
};

export const ErrorMsg = ({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      {...rest}
      className={`text-[0.875em] font-normal text-red-500 ${className ?? ""}`}
    >
      {children}
    </p>
  );
};

export const CustomLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & {
    /** 외부 링크 */
    external?: boolean;
    /** 화살표 표시할 경우 방향 */
    arrow?: "left" | "right";
  }
>(
  (
    { children, className, external, arrow, ...rest },
    ref
  ) => {
    return (
      <Link
        {...rest}
        ref={ref}
        className={`${className ?? ""} underline inline-flex items-center gap-x-[0.25em] text-stone-600 dark:text-stone-400`}
        target={external ? "_blank" : undefined}
      >
        {arrow == "left" && <MdChevronLeft />}
        {external && <HiOutlineExternalLink />}
        {children}
        {arrow == "right" && <MdChevronRight />}
      </Link>
    );
  }
);
