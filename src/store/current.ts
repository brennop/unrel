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

export const nextAtom = atom(null, async (get, set) => {
  const current = get(currentAtom);
  if (!current) return;

  const queue = get(queueAtom);

  if (queue.length > 0) {
    const [next, ...rest] = queue;
    set(currentAtom, next);
    set(queueAtom, rest);
  } else {
    const instance = get(instanceAtom);
    const response = await instance
      .get<{ recommendedVideos: VideoItem[] }>(
        getRecommended(current.videoId)
      )

    const recommended = response.data.recommendedVideos;
    const next = getRandom(recommended);
    set(currentAtom, next)
  }

})
