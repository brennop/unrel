import { Suspense, useState } from "react";

import { searchVideos } from "services/api";

import Playing from "components/playing";
import Trending from "components/trending";
import Spinner from "components/spinner";

export default function Home() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState<VideoItem[]>([]);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    searchVideos(query).then(setSearch);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="border-gray-200 border-b flex items-center p-4 gap-4">
        <form
          className="flex-1 bg-slate-100 h-10 rounded-lg"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            name="q"
            className="bg-transparent p-2 outline-none w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <Suspense
        fallback={
          <div className="grid place-items-center p-4">
            <Spinner />
          </div>
        }
      >
        <Trending />
      </Suspense>

      <Playing />
    </div>
  );
}
