import { useAtom } from "jotai";
import { videosAtom } from "store/videos";
import ListItem from "./list_item";

export default function VideosList({ }) {
  const [videos] = useAtom(videosAtom);

  return (
    <ul className="overflow-auto flex-1 pb-16">
      {videos.map((item) => (
        <ListItem item={item} key={item.videoId} />
      ))}
    </ul>
  );
}
