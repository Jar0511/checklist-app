import { ThemeToggleButton } from "@/features/setting"
import { LoadingFallback } from "@/shared/ui";
import { CustomLink } from "@/shared/ui/CustomElements"
import { Suspense, lazy, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
const LoginForm = lazy(() => import("@/features/auth").then(({ LoginForm }) => ({default: LoginForm})));
const RegisterForm = lazy(() => import("@/features/auth").then(({ RegisterForm }) => ({ default: RegisterForm})));

export const AuthPage = () => {
  const constantAction = ["login", "register"];
  const { action } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(!action || !constantAction.includes(action)) {
      navigate("/auth/login", {replace: true});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, constantAction]);

  return (
    <div className="flex w-screen h-screen">
      <section className="relative flex flex-1 text-sm dark:text-stone-50 text-stone-900 bg-grapefruit-300 dark:bg-grapefruit-500/25">
        <div className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="relative inline-block">
            <img
              src={"/imgs/visual.png"}
              className="inline-block w-60 h-60"
              alt="a grapefruit slice image"
            />
            <div className="absolute w-full h-full top-1/2 backdrop-blur-sm" />
          </div>
        </div>

        <CustomLink
          to="https://www.freepik.com/free-photo/vibrant-orange-slice_953646.htm#fromView=search&page=1&position=2&uuid=f6e44c8f-8519-431a-b5f6-d04270e4192e"
          external
          className="absolute -translate-x-1/2 bottom-5 left-1/2"
        >
          Image by onlyyouqj on Freepik
        </CustomLink>
      </section>
      <div className="flex items-center justify-center flex-1">
        {action === "login" &&
          <Suspense fallback={<LoadingFallback />}>
            <LoginForm />
          </Suspense>
        }
        {action === "register" &&
          <Suspense fallback={<LoadingFallback />}>
            <RegisterForm />
          </Suspense>
        }
        <ThemeToggleButton />
      </div>
    </div>
  )
}