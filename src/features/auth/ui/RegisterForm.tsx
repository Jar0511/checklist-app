import { useForm } from "react-hook-form"
import { RegisterType } from "../model/models"
import { CustomInput } from "@/shared/ui";
import { signUpWithEmail } from "../api";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit
  } = useForm<RegisterType>();
  const emailRegister = register("email");
  const passwordRegister = register("password");
  const nameRegister = register("display_name");


  return (
    <form onSubmit={handleSubmit((result) => signUpWithEmail(result))}>
      <CustomInput type="email" {...emailRegister} />
      <CustomInput type="password" {...passwordRegister} />
      <CustomInput {...nameRegister} />
      <button type="submit">제출</button>
    </form>
  )
}