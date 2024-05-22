import { AnimatePresence, Variants, motion } from "framer-motion";
import { ReactNode } from "react";

const Container: Variants = {
  hidden: {
    opacity: 1,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
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

export const DropDownWrapper = ({
  children,
  width,
  className,
  top,
  bottom,
  left,
  right
}: {
  children: ReactNode;
  width?: string | number;
  className?: string
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}) => (
  <AnimatePresence>
    <motion.div
      className="absolute shadow-md mt-[2px] border border-solid border-neutral-200 dark:border-neutral-500 bg-white dark:bg-stone-700 rounded-md py-[12px] z-[99]"
      variants={Container}
      initial="hidden"
      animate="visible"
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
  </AnimatePresence>
)