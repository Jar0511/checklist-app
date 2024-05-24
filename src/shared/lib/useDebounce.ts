import { useCallback, useEffect, useRef } from "react";

export function useDebounce<I>(fn: (arg: I) => void, delay?: number) {
  const savedCallback = useRef(fn);
  const timerId = useRef<NodeJS.Timeout|null>(null);

  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  const debouncedCallback = useCallback((arg: I) => {
    if(timerId.current) {
      clearTimeout(timerId.current)
    }

    timerId.current = setTimeout(() => {
      savedCallback.current(arg)
    }, delay ?? 300);
  }, [delay]);

  return debouncedCallback;
}