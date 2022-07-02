import {
  HeartIcon,
  SortDescendingIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { useMemo } from "react";
import { currentAtom } from "store/current";
import { instanceAtom } from "store/instance";
import Bars from "./bars";
import ItemMenu from "./menu";
import { favoritesAtom } from "store/favorites";
import { queueAtom } from "store/queue";

type ListItemProps = {
  item: VideoItem;
};

export default function ListItem({ item }: ListItemProps) {
  const x = useMotionValue(0);
  const [current, setCurrent] = useAtom(currentAtom);

  const [instance] = useAtom(instanceAtom);

  const likeBg = useTransform(
    x,
    [-64, 0],
    ["rgb(239, 68, 68)", "rgb(75, 85, 99)"]
  );
  const queueBg = useTransform(
    x,
    [64, 0],
    ["rgb(139, 92, 246)", "rgb(75, 85, 99)"]
  );

  const handleSelect = () => {
    setCurrent(item);
  };

  const isSelected = current?.videoId === item.videoId;

  const setQueue = useSetAtom(queueAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const handleQueue = () => {
    setQueue((queue) => [...queue, item]);
  };

  const isFavorite = useMemo(() => {
    return !!favorites.find((favorite) => favorite.videoId === item.videoId);
  }, [favorites]);

  const addToFavorites = () => {
    setFavorites((favorites) => [...favorites, item]);
  };

  const removeFromFavorites = () => {
    setFavorites(
      favorites.filter((favorite) => favorite.videoId !== item.videoId)
    );
  };

  const handleDragEnd = (_: any, { offset }: PanInfo) => {
    if (offset.x <= -200) {
      if (isFavorite) {
        removeFromFavorites();
      } else {
        addToFavorites();
      }
    } else if (offset.x >= 200) {
      handleQueue();
    }
  };

  return (
    <li className="relative border-b border-slate-200">
      <motion.div
        style={{ background: likeBg }}
        className="absolute inset-y-0 right-0 grid place-items-center p-4"
      >
        {isFavorite ? (
          <TrashIcon className="w-8 h-8 text-white" />
        ) : (
          <HeartIcon className="w-8 h-8 text-white" />
        )}
      </motion.div>
      <motion.div
        style={{ background: queueBg }}
        className="absolute inset-y-0 left-0 grid place-items-center p-4"
      >
        <SortDescendingIcon className="w-8 h-8 text-white" />
      </motion.div>
      <motion.div
        className={`relative flex items-center hover:bg-gray-50 cursor-default px-2 py-1.5 
leading-none
${isSelected ? "bg-slate-100" : "bg-white"}`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        <button className="flex items-center w-full" onClick={handleSelect}>
          <img
            src={`${instance.getUri()}/vi/${item.videoId}/mqdefault.jpg`}
            className="w-12 h-12 rounded-lg object-cover "
          />
          <div className="flex flex-col items-start ml-2 flex-1 w-0">
            <div className="flex items-center w-full">
              {isSelected && <Bars />}
              <span className="font-semibold text-gray-900 leading-snug text-left truncate w-full overflow-y-visible">
                {item.title}
              </span>
            </div>
            <span className="font-normal text-gray-700">{item.author}</span>
            <span className="font-light text-sm text-gray-600">
              {item.publishedText}
            </span>
          </div>
        </button>
        <div className="ml-2">
          <ItemMenu
            isFavorite={isFavorite}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            handleQueue={handleQueue}
          />
        </div>
      </motion.div>
    </li>
  );
}
