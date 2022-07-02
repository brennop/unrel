import { useAtom, useSetAtom } from "jotai";
import { Fragment, useEffect, useRef, useState } from "react";
import Sheet from "react-modal-sheet";
import { PlayIcon, PauseIcon, FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import { currentAtom, nextAtom } from "store/current";
import Spinner from "./spinner";
import Seeker from "./seeker";
import { motion } from "framer-motion";
import Queue from "./queue";
import { queueAtom } from "store/queue";
import { instanceAtom } from "store/instance";
import ButtonAnimation from "./button_animation";
import { Title } from "./title";

export default function Playing() {
  const [queue, setQueue] = useAtom(queueAtom);
  const [current, setCurrent] = useAtom(currentAtom);
  const [instance] = useAtom(instanceAtom);
  const nextVideo = useSetAtom(nextAtom);

  const [open, setOpen] = useState(false);

  const [state, setState] = useState<State>("none");

  const player = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    player.current?.load();

    setState("loading");
  }, [current]);

  const handlePause: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    player.current?.pause();
  };

  const handlePlay: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    player.current?.play();
  };

  const handleEnded = () => {
    const [next, ...rest] = queue;

    if (next) {
      setCurrent(next);
      setQueue(rest);
    }
  };

  const handleNext = () => {
    setState("loading");
    player.current?.pause();
    nextVideo();
  }

  const handleRewind = () => {
    if (player.current) {
      player.current.currentTime = 0;
    }
  }

  return (
    <>
      <button
        className="absolute bottom-0 w-full flex flex-col border-t border-slate-200 bg-gray-200 rounded-t-lg"
        onClick={() => setOpen(true)}
      >
        {current && (
          <div className="p-2 flex items-center gap-2 text-gray-800 w-full">
            <img
              src={`${instance.getUri()}/vi/${current?.videoId}/mqdefault.jpg`}
              className="w-12 h-12 rounded-lg object-cover z-10"
            />

            <Title value={current.title} />

            {state === "loading" ? (
              <div className="p-2">
                <Spinner />
              </div>
            ) : (
              <ButtonAnimation className="w-10 h-10 p-2 grid items-center">
                {state === "playing" && (
                  <button className="" onClick={handlePause}>
                    <PauseIcon className="w-6 h-6" />
                  </button>
                )}
                {state === "paused" && (
                  <button className="" onClick={handlePlay}>
                    <PlayIcon className="w-6 h-6" />
                  </button>
                )}
              </ButtonAnimation>
            )}
          </div>
        )}
        <audio
          controls
          autoPlay
          className="w-full mt-4 hidden"
          ref={player}
          onPlay={() => setState("playing")}
          onPause={() => setState("paused")}
          onLoad={() => setState("playing")}
          onEnded={handleEnded}
        >
          {current &&
            ["false", "true"].map((local) => (
              <Fragment key={local}>
                <source
                  src={`${instance.getUri()}/latest_version?id=${current.videoId
                    }&itag=140&local=${local}`}
                  type='audio/mp4; codecs="mp4a.40.2"'
                />
                <source
                  src={`${instance.getUri()}/latest_version?id=${current.videoId
                    }&itag=251&local=${local}`}
                  type='audio/webm; codecs="opus"'
                />
              </Fragment>
            ))}
        </audio>
      </button>
      <Sheet
        isOpen={open}
        onClose={() => setOpen(false)}
        initialSnap={1}
        snapPoints={[0.85, 256]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {current && (
              <div>
                <div className="flex items-center p-4">
                  <img
                    src={`${instance.getUri()}/vi/${current.videoId
                      }/mqdefault.jpg`}
                    className="h-16 rounded-lg object-cover shadow-lg"
                  />
                  <div className="flex flex-col ml-4 flex-1 w-0">
                    <span className="font-medium text-gray-900 truncate">
                      {current.title}
                    </span>
                    <span className="font-normal text-gray-700">
                      {current.author}
                    </span>
                  </div>
                </div>

                {state === "loading" ? (
                  <div className="w-full grid place-items-center p-4">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <div className="px-6">
                      <Seeker playerRef={player} />
                    </div>

                    <div className="flex justify-between w-full text-gray-800 py-4 px-20">
                      <motion.button
                        whileTap={{ scale: 0.7 }}
                        onClick={handleRewind}
                      >
                        <RewindIcon className="text-gray-400 w-10 h-10" />
                      </motion.button>
                      <ButtonAnimation className="w-10 h-10 p-2 grid items-center">
                        {state === "playing" && (
                          <motion.button
                            className="cursor-auto"
                            onClick={handlePause}
                          >
                            <PauseIcon className="text-gray-400 w-10 h-10" />
                          </motion.button>
                        )}
                        {state === "paused" && (
                          <button className="cursor-auto" onClick={handlePlay}>
                            <PlayIcon className="text-gray-400 w-10 h-10" />
                          </button>
                        )}
                      </ButtonAnimation>
                      <motion.button
                        whileTap={{ scale: 0.7 }}
                        onClick={handleNext}
                      >
                        <FastForwardIcon className="text-gray-400 w-10 h-10" />
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            )}
            <Queue />
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
