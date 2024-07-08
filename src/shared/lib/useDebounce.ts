import { useCallback, useEffect, useRef } from "react";

/** 실행을 디바운스하여 수행하는 함수 리턴 */
export function useDebounce<I>(
  /** void 함수 */
  fn: (arg: I) => void,
  /** 지연 시간(ms, 기본값은 300) */
  delay?: number
) {
  const savedCallback = useRef(fn);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  const debouncedCallback = useCallback(
    (arg: I) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => {
        savedCallback.current(arg);
      }, delay ?? 300);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  return debouncedCallback;
}
