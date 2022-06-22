import { useAtom } from "jotai";
import { useState } from "react";
import Sheet from 'react-modal-sheet';

import { instanceUrl } from "services/api";
import { currentAtom } from "store/current"

export default function Playing() {
  const [open, setOpen] = useState(false);
  const [current] = useAtom(currentAtom)

  return (
    <>
      <button className="absolute bottom-0 w-full flex flex-col border-t border-slate-200 bg-gray-200/80 backdrop-blur-sm rounded-t-lg"
        onClick={() => setOpen(true)}
      >
        <img
          src={`${instanceUrl}/vi/${current?.videoId}/mqdefault.jpg`}
          className="w-16 h-16 rounded-lg object-cover "
        />
      </button>
      <Sheet isOpen={open} onClose={() => setOpen(false)}
        initialSnap={1}
        snapPoints={[0.8, 200]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {current && (
              <div className="flex items-center">
                <img
                  src={`${instanceUrl}/vi/${current.videoId}/mqdefault.jpg`}
                  className="w-16 h-16 rounded-lg object-cover "
                />
                <div className="flex flex-col ml-4 flex-1 w-0">
                  <span className="font-medium text-gray-900 truncate">
                    {current.title}
                  </span>
                  <span className="font-normal text-gray-700">{current.author}</span>
                </div>
              </div>
            )}
            <audio controls autoPlay className="w-full mt-4">
              {current &&
                ["false", "true"].map((local) => (
                  <>
                    <source
                      src={`${instanceUrl}/latest_version?id=${current.videoId}&itag=140&local=${local}`}
                      type='audio/mp4; codecs="mp4a.40.2"'
                    />
                    <source
                      src={`${instanceUrl}/latest_version?id=${current.videoId}&itag=251&local=${local}`}
                      type='audio/webm; codecs="opus"'
                    />
                  </>
                ))}
            </audio>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
