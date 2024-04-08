import { LoginForm } from "@/features/auth"
import { ThemeToggleButton } from "@/features/setting"

export const LoginPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex-1 bg-grapefruit-300"></div>
      <div className="flex items-center justify-center flex-1">
        <LoginForm />
        <ThemeToggleButton />
      </div>
    </div>
  )
}