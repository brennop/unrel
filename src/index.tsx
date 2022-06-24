import { Suspense } from "react";

import Playing from "components/playing";
import Spinner from "components/spinner";
import Search from "components/search";
import VideosList from "components/videos_list";


export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="border-gray-200 border-b flex items-center p-4 gap-4">
        <Search />
      </div>

      <Suspense
        fallback={
          <div className="grid place-items-center p-4">
            <Spinner />
          </div>
        }
      >
        <VideosList />
      </Suspense>

      <Playing />
    </div>
  );
}
