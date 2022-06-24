import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { Children, ReactElement } from "react";

type ButtonAnimationChildren =
  | ReactElement<HTMLMotionProps<"button">>
  | null
  | false
  | undefined;

type ButtonAnimationProps = {
  children: ButtonAnimationChildren | ButtonAnimationChildren[];
  className?: string;
};

export default function ButtonAnimation({
  children,
  className,
}: ButtonAnimationProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <AnimatePresence>
        {Children.map(
          children,
          (child) =>
            child && (
              <motion.button
                {...child.props}
                key={child.key}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.2, opacity: 0 }}
                className={`absolute ${child.props.className ?? ""}`}
              />
            )
        )}
      </AnimatePresence>
    </div>
  );
}
