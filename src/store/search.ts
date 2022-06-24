import { atom } from "jotai";
import { searchVideos } from "services/api";
import { instanceAtom } from "./instance";

export const queryAtom = atom("");

export const searchAtom = atom(
  async get => {
    const query = get(queryAtom);

    const response = await get(instanceAtom).get<VideoItem[]>(searchVideos(query))

    return response.data;
  }
)
