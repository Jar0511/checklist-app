import { type HTMLAttributes, type InputHTMLAttributes, forwardRef } from "react";
import { Callout, ErrorMsg } from ".";
import { type CustomLabelType, required } from "../model";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlineSearch } from "react-icons/md";

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

export const CustomLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement> & CustomLabelType>(({
  children,
  direction,
  align,
  className,
  required,
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
        } [&_span]:text-[0.875em] [&_span]:font-medium ${
          required ? "[&_span]:relative [&_span:after]:content-['*'] [&_span:after]:text-red-500 [&_span:after]:absolute [&_span:after]:-top-[2px] [&_span:after]:font-medium" : ""
        }`}
      >
        {children}
      </label>
    </div>
  )
})

export const SearchInput = ({
  queryKey,
  className,
  realTime
}: {
  queryKey: string;
  className?: string;
  realTime?: boolean;
}) => {
  const {
    register,
    handleSubmit
  } = useForm<{search: string}>()
  const [searchParam, setSearchParam] = useSearchParams();
  const reg = register("search", {required, onChange: (e) => realTime ? setSearchParam({...Object.fromEntries(searchParam), [queryKey]: e.currentTarget.value.trim()}) : null});
  return (
    <form
      className="relative group"
      onSubmit={handleSubmit(({search}) => setSearchParam({...Object.fromEntries(searchParam),[queryKey]: search}))}
    >
      <CustomInput className={`${className ?? ''} pl-[32px]`} {...reg} />
      <MdOutlineSearch className="absolute -translate-y-1/2 left-[8px] top-1/2 group-has-[:focus]:text-grapefruit-400" />
    </form>
  )
}

export const CustomTextarea = forwardRef<
  HTMLTextAreaElement,
  HTMLAttributes<HTMLTextAreaElement> & {resizable?: boolean}
>(({
  className,
  resizable,
  ...rest
}, ref) => {
  return (
    <textarea
      ref={ref}
      {...rest}
      className={`${
        className ?? ''
      } w-full p-[0.5em] disabled:opacity-35 rounded border ${
        className?.includes("border-") ? '' : 'border-neutral-500 dark:border-neutral-300'
      } ${
        resizable ? "" : "resize-none"
      } focus:outline-none focus:border-grapefruit-400 focus:border-2 box-border disabled:cursor-not-allowed bg-[inherit]`}
    />
  )
})