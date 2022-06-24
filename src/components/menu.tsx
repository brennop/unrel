import { Menu, Transition } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon, HeartIcon, SortDescendingIcon } from "@heroicons/react/solid";
import { useAtom, useSetAtom } from "jotai";
import { Fragment, useMemo } from "react";
import { favoritesAtom } from "store/favorites";
import { queueAtom } from "store/queue";

type MenuProps = {
  video: VideoItem;
}

export default function ItemMenu({
  video
}: MenuProps) {
  const setQueue = useSetAtom(queueAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const handleQueue = () => {
    setQueue((queue) => [...queue, video])
  }

  const isFavorite = useMemo(() => {
    return !!favorites.find(favorite => favorite.videoId === video.videoId);
  }, [favorites])

  const addToFavorites = () => {
    setFavorites(favorites => [...favorites, video]);
  }

  const removeFromFavorites = () => {
    setFavorites(favorites.filter(favorite => favorite.videoId !== video.videoId))
  }

  return <Menu as="div" className="relative inline-block text-left">
    <div>
      <Menu.Button className="p-2">
        <DotsHorizontalIcon className="w-4 h-4 text-gray-900" />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className="absolute right-0 mt-2 w-max z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1 ">
          {isFavorite ?
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={removeFromFavorites}
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Remove from favorites
                </button>
              )}
            </Menu.Item>
            : (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={addToFavorites}
                  >
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Add to favorites
                  </button>
                )}
              </Menu.Item>
            )}
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={handleQueue}
              >
                <SortDescendingIcon className="w-4 h-4 mr-2" />
                Add to queue
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
}
