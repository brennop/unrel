import { Atom, useAtom } from "jotai";
import { videosAtom } from "store/videos";
import ListItem from "./list_item";

type VideosListProps = {
  atom?: Atom<Promise<VideoItem[]> | VideoItem[]>
}

export default function VideosList({ atom = videosAtom }: VideosListProps) {
  const [videos] = useAtom(atom);

  return (
    <ul className="overflow-auto flex-1 pb-16">
      {videos.map((item) => (
        <ListItem item={item} key={item.videoId} />
      ))}
    </ul>
  );
}
