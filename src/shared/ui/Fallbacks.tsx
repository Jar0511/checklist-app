import { ReactNode } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom"

export const RouteErrorFallBack = ({
  root
}: {
  /** root 레벨의 에러 처리인지 여부 */
  root?: boolean
}) => {
  const error = useRouteError();

  console.log(error);
  return (
    <div className={`flex items-center justify-center ${root ? 'w-screen h-screen' : 'w-full h-full'}`}>
      {
        isRouteErrorResponse(error) ?
        <div className="flex flex-col items-center gap-y-5">
          <div className="inline-flex flex-col items-center text-xl font-bold gap-y-2">
            <span className="inline-block px-3 py-1 text-lg font-semibold text-red-800 bg-red-200 rounded-lg">{error.status}</span>
            <h1>{error.statusText}</h1>
          </div>
          <p>{error.data}</p>
        </div>
        :
        <div className="flex flex-col items-center gap-y-5">
          <div className="inline-flex flex-col items-center text-xl font-bold gap-y-2">
            <span className="inline-block px-3 py-1 text-lg font-semibold text-red-800 bg-red-200 rounded-lg">Error</span>
            <h1>오류 발생</h1>
          </div>
          <p>{(error as Error).message}</p>
        </div>
      }
    </div>
  )
}

const Spinner = ({
  size
}: {
  /** pixel size */
  size?: number
}) => {
  const bgSize = Math.round((size ?? 50) * 0.24);
  return (
    <div
      className="animate-spinner loader aspect-[1]"
      style={{
        width: `${size ?? 50}px`,
        backgroundSize: `${bgSize}px ${bgSize}px`
      }}
    />
  )
}

export const LoadingFallback = ({
  screen,
  size
}:{
  /** 페이지 로딩 폴백 여부 */
  screen?: boolean;
  /** spinner size(pixel) */
  size?: number
}) => {
  return (
    <div className={`flex items-center justify-center ${screen ? 'w-screen h-screen' : 'w-full h-full'}`}>
      <Spinner size={size ? size : (screen ? 72 : 50)} />
    </div>
  )
}

export const SkeletonWrapper = ({children, className} : {children?: ReactNode, className?: string}) => (
  <div className={`animate-pulse *:bg-gray-200 dark:*:bg-gray-700 ${className ?? ''}`}>
    {children}
  </div>
)