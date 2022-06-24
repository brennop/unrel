import { atom } from "jotai";
import { getTrending } from "services/api";
import { instanceAtom } from "./instance";
import { queryAtom, searchAtom } from "./search";

export const trendingAtom = atom(async (get) =>
  get(instanceAtom)
    .get<VideoItem[]>(getTrending())
    .then((response) => response.data)
);

export const videosAtom = atom(get => {
  if (get(queryAtom)) {
    return get(searchAtom);
  } else {
    return get(trendingAtom);
  }
}
)

