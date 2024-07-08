import { useForm } from "react-hook-form";
import type { RegisterType } from "../model/models";
import {
  CustomInput,
  CustomLabel,
  ErrorMsg,
  CustomLink,
  FilledButton,
} from "@/shared/ui";
import { signUpWithEmail } from "../api";
import { useState } from "react";
import { FormColWrapper, FormContainer } from "./layout";
import { required } from "@/shared/model";

export const RegisterForm = () => {
  const [serverErr, setServerErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();
  const emailRegister = register("email", { required });
  const passwordRegister = register("password", {
    required,
  });
  const nameRegister = register("display_name", {
    required,
  });

  return (
    <FormContainer
      heading="Sign Up"
      onSubmit={handleSubmit((result) =>
        signUpWithEmail(result).then(({ error }) => {
          if (error) {
            setServerErr(error.message);
          }
        })
      )}
    >
      <FormColWrapper>
        <CustomLabel direction="portrait">
          <span>Name</span>
          <CustomInput
            {...nameRegister}
            placeholder="이름을 입력하세요"
            err={errors.display_name?.message}
            showErr
          />
        </CustomLabel>
        <CustomLabel direction="portrait">
          <span>Email</span>
          <CustomInput type="email" {...emailRegister} />
        </CustomLabel>
        <CustomLabel direction="portrait">
          <span>Password</span>
          <CustomInput
            type="password"
            {...passwordRegister}
          />
        </CustomLabel>
        <CustomLink
          to="/auth/login"
          replace
          className="text-sm"
          arrow="left"
        >
          로그인 화면으로 돌아가기
        </CustomLink>
      </FormColWrapper>
      <FilledButton btncolor="primary" type="submit">
        제출
      </FilledButton>
      {!!serverErr && (
        <ErrorMsg className="text-center">
          🚨 {serverErr}
        </ErrorMsg>
      )}
    </FormContainer>
  );
};
