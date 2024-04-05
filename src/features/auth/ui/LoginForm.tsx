import { CustomInput } from "@/shared/ui";
import { useForm } from "react-hook-form"
import { signInWithEmail } from "../api";
import { LoginType } from "..";

export const LoginForm = () => {
  const {
    register,
    handleSubmit
  } = useForm<LoginType>();

  const emailRegister = register("email");
  const passwordRegister = register("password");

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit((result) => signInWithEmail(result).then(({data, error}) => {console.log("data",data); console.log("error", error)}))}
    >
      <h1>Login</h1>
      <CustomInput type="email" {...emailRegister} />
      <CustomInput type="password" {...passwordRegister} />
      <button type="submit">?</button>
    </form>
  )
}