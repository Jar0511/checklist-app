import { useAtomValue } from "jotai";
import { createPortal } from "react-dom";
import { modalShowAtom } from "../model";

export const useDialog = (Component: () => JSX.Element) => {
  const show = useAtomValue(modalShowAtom);
  const portal = document.getElementById("portal") as Element;

  return (
    <>
      {createPortal(
        show ? <Component /> : <></>,
        portal
      )}
    </>
  )
}