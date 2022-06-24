import { atom, useAtom } from "jotai";
import { instanceAtom } from "store/instance";
import { getTrending } from "services/api";
import ListItem from "./list_item";

const trending = atom(async (get) =>
  get(instanceAtom)
    .get<VideoItem[]>(getTrending())
    .then((response) => response.data)
);

export default function Trending({ }) {
  const [videos] = useAtom(trending);

  return (
    <ul className="overflow-auto flex-1 pb-16">
      {videos.map((item) => (
        <ListItem item={item} key={item.videoId} />
      ))}
    </ul>
  );
}
