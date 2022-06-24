import { atom } from "jotai";
import { getRecommended } from "services/api";
import { getRandom } from "utils";
import { queueAtom } from "./queue";

const primitiveCurrentAtom = atom<VideoItem | null>(null);

export const currentAtom = atom<VideoItem | null, VideoItem>(
  (get) => get(primitiveCurrentAtom),
  (get, set, newVideo) => {
    set(primitiveCurrentAtom, newVideo);

    const queue = get(queueAtom);

    // get a recommended video if queue is empty
    if (queue.length === 0) {
      getRecommended(newVideo.videoId).then((recommended) => {
        const next = getRandom(recommended);
        set(queueAtom, (queue) => [...queue, next]);
      });
    }
  }
);
