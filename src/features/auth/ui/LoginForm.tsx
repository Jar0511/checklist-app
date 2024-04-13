import { CustomButton, CustomInput } from "@/shared/ui";
import { useForm } from "react-hook-form"
import { signInWithEmail } from "../api";
import { LoginType } from "..";
import { CustomLabel, CustomLink } from "@/shared/ui/CustomElements";
import { required } from "@/shared/model";
import { useState } from "react";
import { FormColWrapper, FormContainer } from "./layout";

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
    <FormContainer
      heading="Login"
      onSubmit={handleSubmit((result) =>
        signInWithEmail(result).then(({error}) => {
          if(error) {
            setServerErr(error.message);
            return setFocus("password");
          }
        }))
      }
    >
      <FormColWrapper>
        <CustomLabel direction="portrait">
          <span>Email</span>
          <CustomInput type="email" {...emailRegister} />
        </CustomLabel>
        <CustomLabel direction="portrait">
          <span>Password</span>
          <CustomInput type="password" {...passwordRegister} />
        </CustomLabel>
        <div className="flex items-stretch justify-between text-sm gap-x-3">
          <CustomLink to="/auth/register" arrow="left">비밀번호 찾기</CustomLink>
          <CustomLink to="/auth/register" arrow="right">회원 가입</CustomLink>
        </div>
      </FormColWrapper>
      <CustomButton type="submit">로그인</CustomButton>
      {!!serverErr && <p className="text-center err-msg">🚨 {serverErr}</p>}
    </FormContainer>
  )
}