import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { Children, forwardRef, ReactElement } from "react";

type ButtonAnimationChildren =
  | ReactElement<HTMLMotionProps<"button">>
  | null
  | false
  | undefined;

type ButtonAnimationProps = {
  children: ButtonAnimationChildren | ButtonAnimationChildren[];
  className?: string;
};

export default forwardRef<HTMLDivElement,  ButtonAnimationProps>(function ButtonAnimation({
  children,
  className,
}, ref) {
  return (
    <div className={`relative ${className ?? ""}`} ref={ref}>
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
})
