import { useAtom } from "jotai";
import { currentAtom } from "store/current";
import { instanceUrl } from "services/api";

type ListItemProps = {
  item: VideoItem;
};

export default function ListItem({ item }: ListItemProps) {
  const [current, setCurrent] = useAtom(currentAtom);

  const handleSelect = () => {
    setCurrent(item);
  };

  return (
    <li
      className={`flex border-b border-slate-200 hover:bg-gray-50 cursor-default px-2 py-1.5 
leading-none
${
        current?.videoId === item.videoId ? "bg-slate-100" : ""
      }`}
    >
      <button className="flex items-center w-full" onClick={handleSelect}>
        <img
          src={`${instanceUrl}/vi/${item.videoId}/mqdefault.jpg`}
          className="w-12 h-12 rounded-lg object-cover "
        />
        <div className="flex flex-col items-start ml-2 flex-1 w-0">
          <span className="font-semibold text-gray-900 leading-snug text-left truncate w-full overflow-y-visible">
            {item.title}
          </span>
          <span className="font-normal text-gray-700">{item.author}</span>
          <span className="font-light text-sm text-gray-600">
            {item.publishedText}
          </span>
        </div>
      </button>
    </li>
  );
}
