import { useAtom } from "jotai";
import { Fragment, useEffect, useRef, useState } from "react";
import Sheet from "react-modal-sheet";
import { PlayIcon, PauseIcon } from "@heroicons/react/outline";

import { instanceUrl } from "services/api";
import { currentAtom } from "store/current";
import Spinner from "./spinner";
import Seeker from "./seeker";

export default function Playing() {
  const [open, setOpen] = useState(false);
  const [current] = useAtom(currentAtom);

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

  return (
    <>
      <button
        className="absolute bottom-0 w-full flex flex-col border-t border-slate-200 bg-gray-200 rounded-t-lg"
        onClick={() => setOpen(true)}
      >
        {current && (
          <div className="p-2 flex items-center gap-2 text-gray-800 w-full">
            <img
              src={`${instanceUrl}/vi/${current?.videoId}/mqdefault.jpg`}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <span className="font-medium truncate flex-1">{current.title}</span>

            {state === "playing" && (
              <button className="p-2" onClick={handlePause}>
                <PauseIcon className="w-6 h-6" />
              </button>
            )}
            {state === "paused" && (
              <button className="p-2" onClick={handlePlay}>
                <PlayIcon className="w-6 h-6" />
              </button>
            )}
            {state === "loading" && (
              <div className="p-2">
                <Spinner />
              </div>
            )}
          </div>
        )}
        <audio controls autoPlay className="w-full mt-4 hidden" ref={player}
          onPlay={() => setState("playing")}
          onPause={() => setState("paused")}
          onLoad={() => setState("playing")}       >
          {current &&
            ["false", "true"].map((local) => (
              <Fragment key={local}>
                <source
                  src={`${instanceUrl}/latest_version?id=${current.videoId}&itag=140&local=${local}`}
                  type='audio/mp4; codecs="mp4a.40.2"'
                />
                <source
                  src={`${instanceUrl}/latest_version?id=${current.videoId}&itag=251&local=${local}`}
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
                    src={`${instanceUrl}/vi/${current.videoId}/mqdefault.jpg`}
                    className="w-20 h-20 rounded-lg object-cover shadow-md"
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

                    <div className="flex justify-between w-full text-gray-800">
                      <div />
                      {state === "playing" && (
                        <button className="" onClick={handlePause}>
                          <PauseIcon className="w-10 h-10" />
                        </button>
                      )}
                      {state === "paused" && (
                        <button className="" onClick={handlePlay}>
                          <PlayIcon className="w-10 h-10" />
                        </button>
                      )}
                      <div />
                    </div>
                  </>
                )}
              </div>
            )}
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
