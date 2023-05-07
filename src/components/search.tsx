import { SearchIcon, XCircleIcon } from "@heroicons/react/solid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { queryAtom } from "store/search";

export default function Search() {
  const setQuery = useSetAtom(queryAtom);
  const input = useRef<HTMLInputElement>(null!);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setQuery(input.current.value)
  };

  return <form
    className="flex-1 bg-slate-100 h-10 rounded-lg relative flex items-center"
    onSubmit={handleSearch}
  >
    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
      <SearchIcon className="w-5 h-5 text-gray-500"/>
    </div>
    <input
      type="search"
      name="q"
      className="bg-transparent pl-10 p-2 outline-none w-full"
      ref={input}
    />
    <button className="p-2" type="reset" onClick={() => setQuery("")}>
      <XCircleIcon className="w-4 h-4 text-gray-400" />
    </button>
  </form>
}
