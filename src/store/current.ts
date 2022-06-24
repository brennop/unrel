import { atom } from "jotai";
import { getRecommended } from "services/api";
import { getRandom } from "utils";
import { instanceAtom } from "./instance";
import { queueAtom } from "./queue";

const primitiveCurrentAtom = atom<VideoItem | null>(null);

export const currentAtom = atom<VideoItem | null, VideoItem>(
  (get) => get(primitiveCurrentAtom),
  (get, set, newVideo) => {
    set(primitiveCurrentAtom, newVideo);

    const queue = get(queueAtom);

    // get a recommended video if queue is empty
    if (queue.length === 0) {
      const instance = get(instanceAtom);
      instance
        .get<{ recommendedVideos: VideoItem[] }>(
          getRecommended(newVideo.videoId)
        )
        .then((response) => {
          const recommended = response.data.recommendedVideos;
          const next = getRandom(recommended);
          set(queueAtom, (queue) => [...queue, next]);
        });
    }
  }
);
