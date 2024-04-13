import { HTMLAttributes, ReactNode } from "react"

export const FormContainer = ({heading, children, ...rest}: {heading: string} & HTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      className="flex flex-col gap-y-12 w-[360px] items-stretch"
      {...rest}
    >
      <h1 className="text-5xl font-bold tracking-wide">{heading}</h1>
      <div className="flex flex-col gap-y-8">
        {children}
      </div>
    </form>
  )
}

export const FormColWrapper = ({children}: {children?: ReactNode}) => {
  return (
    <div className="flex flex-col gap-y-3">{children}</div>
  )
}