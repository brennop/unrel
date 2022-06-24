import { Suspense, useReducer } from "react";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";

import Playing from "components/playing";
import Spinner from "components/spinner";
import Search from "components/search";
import VideosList from "components/videos_list";
import { favoritesAtom } from "store/favorites";
import { videosAtom } from "store/videos";
import ButtonAnimation from "components/button_animation";

export default function Home() {
  const [isFavorites, toggleFavorites] = useReducer((state) => !state, false);

  const fallback = (
    <div className="grid place-items-center p-4">
      <Spinner />
    </div>
  );

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="border-gray-200 border-b flex items-center p-4 gap-4">
        <Search />
        <ButtonAnimation className="w-6 h-6">
          {isFavorites ? (
            <button onClick={toggleFavorites} key="solid">
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            </button>
          ) : (
            <button onClick={toggleFavorites} key="outline">
              <HeartIconOutline className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </ButtonAnimation>
      </div>

      <Suspense fallback={fallback}>
        <VideosList atom={isFavorites ? favoritesAtom : videosAtom} />
      </Suspense>

      <Playing />
    </div>
  );
}
