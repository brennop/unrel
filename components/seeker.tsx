import { useCallback, useEffect, useState } from "react"
import 'range-slider-element';

type SeekerProps = {
  playerRef: React.RefObject<HTMLAudioElement>
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = (time - minutes * 60)
  return `${minutes}:${seconds.toFixed().padStart(2, '0')}`
}

export default function Seeker({
  playerRef
}: SeekerProps) {
  const [seeking, setSeeking] = useState(false);
  const [seek, setSeek] = useState(0);

  const handleTimeUpdate = useCallback(() => {
    const player = playerRef.current;

    if (player && !seeking) {
      setSeek(player.currentTime)
    }
  }, [seeking]);

  useEffect(() => {
    playerRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => playerRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
  }, [handleTimeUpdate])

  const handleSeek: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();

    setSeeking(true);
    setSeek(parseFloat(event.target.value));
  }

  const handleSeekEnd = (event: React.SyntheticEvent) => {
    setSeeking(false);

    const player = playerRef.current;

    if (player) {
      player.currentTime = parseFloat((event.target as HTMLInputElement).value)
    }
  }

  return <div className="">
    <input
      type="range"
      min={0}
      max={playerRef.current?.duration}
      step={0.001}
      value={seek}
      onChange={handleSeek}
      onMouseUp={handleSeekEnd}
      onTouchEnd={handleSeekEnd}
      className="w-full h-1 bg-gray-400/50 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    />
    <div className="flex justify-between">
      <span>{formatTime(seek)}</span>
      <span>{formatTime(playerRef.current?.duration || 0)}</span>
    </div>
  </div>
}
