import { useEffect, useState } from "react";

/**
 * 출처: https://fe-developers.kakaoent.com/2021/211127-211209-suspense/
 * 데이터 패칭 중에 스켈레톤 UI를 보여주기 위해 커스텀 훅 추가
 */
export function useFetch<I, T>(fetch: (arg: I) => Promise<T>, arg: I){
  function resolvePromise(result: T) {
    // promsie fulfilled
    _setStatus("fulfilled");
    _setResult(result);
  }
  function rejectPromise(error: Error) {
    // promsie rejected
    _setStatus("error");
    _setError(error);
  }
  const [_promise, _setPromise] = useState<Promise<void>>();
  const [_status, _setStatus] = useState<"pending" | "fulfilled" | "error">("pending");
  const [_result, _setResult] = useState<T>();
  const [_error, _setError] = useState<Error>();

  useEffect(() => {
    _setStatus("pending");
    _setPromise(fetch(arg).then(resolvePromise, rejectPromise));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arg]);

  if (_status === "pending" && _promise) {
    throw _promise; // * suspense fallback *
  }
  if (_status === "error") {
    throw _error; // error
  }
  return _result; // rendering result
}