import { CustomButton, CustomInput } from "@/shared/ui";
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
      className="flex flex-col gap-y-12"
      onSubmit={handleSubmit((result) => signInWithEmail(result).then(({data, error}) => {console.log("data",data); console.log("error", error)}))}
    >
      <h1 className="text-5xl font-bold">Login</h1>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-2">
            <CustomInput type="email" {...emailRegister} />
            <CustomInput type="password" {...passwordRegister} />
          </div>
          <div className="flex items-stretch justify-between gap-x-3">
            <CustomButton size="sm">비밀번호 잊음</CustomButton>
            <CustomButton size="sm">회원 가입</CustomButton>
          </div>
        </div>
        <CustomButton type="submit">제출</CustomButton>
      </div>

    </form>
  )
}