import { InputHTMLAttributes, forwardRef } from "react";
import { Callout } from ".";

export const CustomInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((prop, ref) => {
  return (
    <div className="inline-flex flex-col gap-y-1">
      {
        import.meta.env.MODE === "development" &&
        (prop.type == "week" || prop.type == "month") ?
        <Callout className="bg-amber-100">
          해당 타입은 브라우저마다 다른 입력값을 받을 수 있습니다(이 경고는 개발 모드에서만 표시됩니다).
        </Callout>
        :
        <></>
      }
      <input
        {...prop}
        ref={ref}
        type={prop.type ?? "text"}
        className={`${
          prop.className ?? ''
        } ${
          prop.type == "number" ? "number-appearance-none" : ""
        } ${
          prop.type == "color" ? "color-appearance-none w-10 h-10" : `disabled:opacity-35 rounded py-[0.2em] px-[0.2em] border ${
            prop.className?.includes("border-") ? '' : 'border-neutral-400'
          }`
        } focus:outline-none focus:border-grapefruit-400 focus:border-2 disabled:cursor-not-allowed`}
      />
    </div>
  )
});