import { atomWithStorage } from "jotai/utils"

export const favoritesAtom = atomWithStorage<VideoItem[]>("favorites", []);
