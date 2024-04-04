import { HTMLAttributes, forwardRef } from "react";

const CustomInput = forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement>>((prop, ref) => {
  return (
    <input
      {...prop}
      ref={ref}
    />
  )
})

export default CustomInput;