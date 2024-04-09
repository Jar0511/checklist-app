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
        <div></div>
      }
    </div>
  )
}