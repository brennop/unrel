import { Fragment, Suspense, useEffect, useState } from "react";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";

import Playing from "components/playing";
import Spinner from "components/spinner";
import Search from "components/search";
import VideosList from "components/videos_list";
import { favoritesAtom } from "store/favorites";
import { videosAtom } from "store/videos";
import ButtonAnimation from "components/button_animation";
import { Tab } from "@headlessui/react";
import { useAtom } from "jotai";
import { queryAtom } from "store/search";

export default function Home() {
  const [tab, setTab] = useState(0);
  const [query] = useAtom(queryAtom);

  useEffect(() => {
    if (query) {
      setTab(0);
    }
  }, [query])

  const fallback = (
    <div className="grid place-items-center p-4">
      <Spinner />
    </div>
  );

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Tab.Group selectedIndex={tab} onChange={setTab}>
        <Tab.List as="div" className="border-gray-200 border-b flex items-center p-4 gap-4">
          <Tab as={Fragment}>
            <Search />
          </Tab>
          {!query && (
            <Tab as={Fragment}>
              {({ selected }) => (
                <ButtonAnimation className="w-6 h-6">
                  {selected ? (
                    <button onClick={() => setTab(0)} key="solid">
                      <HeartIconSolid className="w-6 h-6 text-red-500" />
                    </button>
                  ) : (
                    <button onClick={() => setTab(1)} key="outline">
                      <HeartIconOutline className="w-6 h-6 text-gray-600" />
                    </button>
                  )}
                </ButtonAnimation>

              )}
            </Tab>
          )}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <Suspense fallback={fallback}>
              <VideosList atom={videosAtom} />
            </Suspense>
          </Tab.Panel>
          <Tab.Panel>
            <Suspense fallback={fallback}>
              <VideosList atom={favoritesAtom} />
            </Suspense>
          </Tab.Panel>
        </Tab.Panels>

      </Tab.Group>


      <Playing />
    </div>
  );
}
