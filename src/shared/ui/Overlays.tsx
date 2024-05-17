import { useAtomValue } from "jotai";
import { createPortal } from "react-dom";
import { modalShowAtom } from "../model";

export const Modal = () => {
  const show = useAtomValue(modalShowAtom);
  const portal = document.getElementById("portal") as Element;

  return (
    <>
      {createPortal(
        show ?
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/50">
          <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 font-Pretendard text-neutral-900 dark:bg-stone-900 dark:text-stone-50 w-[288px] sm:w-[300px] md:w-[420px] rounded-xl h-auto max-h-[80vh]">
            ???
          </div>
        </div>
        : <></>,
        portal
      )}
    </>
  )
}