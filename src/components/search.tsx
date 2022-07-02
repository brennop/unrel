import { SearchIcon, XCircleIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { useAtom, } from "jotai";
import { forwardRef, useRef } from "react";
import { queryAtom } from "store/search";


export default forwardRef<HTMLFormElement, {}>(function Search(
  { },
  ref
) {
  const [query, setQuery] = useAtom(queryAtom);
  const input = useRef<HTMLInputElement>(null!);

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setQuery(input.current.value);
  };

  const handleReset = () => {
    setQuery("");
    input.current.value = ""
  };

  return (
    <motion.form
      className="flex-1 bg-slate-100 h-10 rounded-lg relative flex items-center"
      onSubmit={handleSearch}
      layout
      ref={ref}
    >
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-500" />
      </div>
      <input
        type="search"
        name="q"
        className="bg-transparent pl-10 p-2 outline-none w-full"
        ref={input}
      />
      {query && (
        <button className="p-2" type="reset" onClick={handleReset}>
          <XCircleIcon className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </motion.form>
  );
});
