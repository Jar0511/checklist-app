import { ReactNode } from "react";
import { IconType } from "react-icons";

export const Callout = ({icon: Icon, className, children}: {icon?: string | IconType ,className?: string; children?: ReactNode}) => {
  return (
    <div className={`${className ?? ''} ${className?.includes("bg-") ? '' : 'bg-neutral-200'} text-stone-900 rounded-md py-3 px-2 flex items-start gap-x-2`}>
      <div>{Icon ? (typeof Icon == "string" ? Icon : <Icon />) : '💡'}</div>
      <div className="flex-1 break-all whitespace-pre-line">{children}</div>
    </div>
  )
}