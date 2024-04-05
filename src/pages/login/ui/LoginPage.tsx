import { LoginForm, RegisterForm } from "@/features/auth"

export const LoginPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex-1"></div>
      <div className="flex items-center justify-center flex-1">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  )
}