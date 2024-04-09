import { CustomButton, CustomInput } from "@/shared/ui";
import { useForm } from "react-hook-form"
import { signInWithEmail } from "../api";
import { LoginType } from "..";
import { CustomLabel, CustomLink } from "@/shared/ui/CustomElements";
import { required } from "@/shared/model";
import { useState } from "react";

export const LoginForm = () => {
  const [serverErr, setServerErr] = useState("");
  const {
    register,
    handleSubmit,
    setFocus
  } = useForm<LoginType>();

  const emailRegister = register("email", {required});
  const passwordRegister = register("password", {required});

  return (
    <form
      className="flex flex-col gap-y-12 w-[360px] items-stretch"
      onSubmit={handleSubmit((result) =>
        signInWithEmail(result).then(({data, error}) => {
          if(error) {
            setServerErr(error.message);
            return setFocus("password");
          }
          console.log("data",data); console.log("error", error)
        }))
      }
    >
      <h1 className="text-5xl font-bold tracking-wide">Login</h1>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-3">
            <CustomLabel direction="portrait">
              <span>Email</span>
              <CustomInput type="email" {...emailRegister} />
            </CustomLabel>
            <CustomLabel direction="portrait">
              <span>Password</span>
              <CustomInput type="password" {...passwordRegister} />
            </CustomLabel>
          </div>
          <div className="flex items-stretch justify-between text-sm gap-x-3 text-stone-600 dark:text-stone-400">
            <CustomLink to="/auth/register" arrow="left">비밀번호 찾기</CustomLink>
            <CustomLink to="/auth/register" arrow="right">회원 가입</CustomLink>
          </div>
        </div>
        <CustomButton type="submit">로그인</CustomButton>
        {!!serverErr && <p className="text-center err-msg">🚨 {serverErr}</p>}
      </div>

    </form>
  )
}