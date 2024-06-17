import { type Variants, motion } from "framer-motion";
import type { ReactNode } from "react";

const FadeContainer: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      duration: 0.3,
    }
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const PopContainer = (origin: string): Variants => ({
  hidden: {
    scale: 0,
    transformOrigin: origin,
    transition: {
      when: "afterChildren",
      duration: 0.3,
    }
  },
  visible: {
    scale: 1,
    transformOrigin: origin,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
});
const Item: Variants = {
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1
  }
}

/** 반드시 AnimatePresence로 감싸서 사용 */
export const DropDownWrapper = ({
  children,
  width,
  className,
  top,
  bottom,
  left,
  right,
  fade
}: {
  children: ReactNode;
  width?: string | number;
  className?: string
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  fade?: boolean;
}) => (
  <motion.div
    className={`absolute shadow-md mt-[2px] border border-solid border-neutral-200 dark:border-neutral-400 bg-white dark:bg-stone-700 rounded-md py-[12px] ${
      top == "50%" ? "-translate-y-1/2" : ''
    } ${
      bottom == "50%" ? "translate-y-1/2" : ''
    } ${
      right == "50%" ? "translate-x-1/2" : ''
    } ${
      left == "50%" ? "-translate-x-1/2" : ''
    }`}
    variants={
      fade ?
      FadeContainer :
      PopContainer(
        `${
          top == "50%" || bottom == "50%" ? "middle " :
          top ? "bottom " : "top "
        }${
          left == "50%" || right == "50%" ? "center" :
          left ? "left" : "right"
        }`
      )
    }
    initial="hidden"
    animate="visible"
    exit="hidden"
    style={{
      width: width ?? "200px",
      top,
      bottom,
      left,
      right
    }}
  >
    <motion.div variants={Item} className={`${className ?? ""} flex flex-col *:px-[16px]`}>
      {children}
    </motion.div>
  </motion.div>
)