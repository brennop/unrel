import { motion, PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type SeekerProps = {
  playerRef: React.RefObject<HTMLAudioElement>;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes}:${seconds.toFixed().padStart(2, "0")}`;
};

export default function Seeker({ playerRef }: SeekerProps) {
  const [seeking, setSeeking] = useState(false);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);

  const bar = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  const handleTimeUpdate = useCallback(() => {
    const player = playerRef.current;

    if (player && !seeking) {
      setSeek(player.currentTime);
    }
  }, [seeking]);

  useEffect(() => {
    handleTimeUpdate();
    playerRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () =>
      playerRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
  }, [handleTimeUpdate]);

  useEffect(() => {
    const player = playerRef.current;

    // Safari audio double duration fix
    if (navigator.vendor == "Apple Computer, Inc.") {
      player?.addEventListener("loadedmetadata", function() {
        player?.addEventListener("timeupdate", function() {
          const remaining = player.duration - player.currentTime;
          if (remaining < player.duration / 2 && remaining >= 2) {
            player.currentTime = player.duration - 1;
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    const handleMetadata = () => {
      if (navigator.vendor == "Apple Computer, Inc.") {
        setDuration(playerRef.current!.duration / 2);
      } else {
        setDuration(playerRef.current!.duration);
      }
    };

    if (playerRef.current) {
      handleMetadata(); // handle on mounting
    }

    playerRef.current?.addEventListener("loadedmetadata", handleMetadata);
    return () =>
      playerRef.current?.removeEventListener("loadedmetadata", handleMetadata);
  }, []);

  useEffect(() => {
    const handleBarResize = () => {
      setBarWidth(bar.current!.clientWidth);
    }
    if (bar.current) {
      handleBarResize();
    }
    bar.current?.addEventListener("resize", handleBarResize);
    return () => bar.current?.removeEventListener("resize", handleBarResize);
  })

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
  ) => {
    setSeeking(false);

    playerRef.current!.currentTime = seek;
  };

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    let ratio = (info.point.x - 0.5 * window.innerWidth) / barWidth + 0.5
    ratio = Math.max(Math.min(ratio, 1), 0)
    setSeek(ratio * duration);
  }

  return (
    <div className="">
      <div className="relative">
        {barWidth && (
          <motion.div
            className="h-4 w-4 rounded-full bg-gray-50 z-10"
            drag
            whileTap={{ scale: 1.4 }}
            animate={!seeking && { x: (seek / duration) * barWidth - 8 }}
            dragConstraints={{
              left: 0,
              right: (barWidth) - 8,
              top: 0,
              bottom: 0,
            }}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onDragStart={() => setSeeking(true)}
          />
        )}
        <div className="absolute -z-10 inset-0 flex flex-col justify-center">
          <div
            className="w-full h-1 bg-gray-400 rounded-lg" ref={bar} />
        </div>
        <div className="absolute -z-10 inset-0 flex flex-col justify-center">
          <div
            style={{ width: `calc(${seek * 100 / duration + "%"} + 2px)` }}
            className="w-full h-1 bg-gray-50 rounded-l-lg border-r border-r-gray-50" />
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-800 text-sm">{formatTime(seek)}</span>
        <span className="text-gray-800 text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
}
