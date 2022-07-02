import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSetAtom } from "jotai";
import { nextAtom } from "store/current";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type TitleProps = {
  value: string;
}

export const Title = ({ value }: TitleProps) => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextVideo = useSetAtom(nextAtom);

  const paginate = () => {
    setIndex(index => index + 1);

    setLoading(true);
    nextVideo().finally(() => setLoading(false));
  };

  return (
    <div className="w-64 h-12 flex items-center">
      <AnimatePresence initial={false} custom={index}>
        <motion.p
          key={index}
          className="fixed font-medium truncate w-64 text-left"
          custom={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (offset.x < -100 || swipe < -swipeConfidenceThreshold) {
              paginate();
            }
          }}
        >
          {loading ? "Loading..." : value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
