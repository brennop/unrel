import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Reorder } from "framer-motion";
import { useAtom } from "jotai";
import { useState } from "react";

import { currentAtom } from "store/current";
import { queueAtom } from "store/queue";

export default function Queue() {
  const [queue, setQueue] = useAtom(queueAtom);
  const [_, setCurrent] = useAtom(currentAtom);
  const [draggable, setDraggable] = useState(false);

  const handleItem = (index: number) => {
    const item = queue.at(index)!;
    const itemIndex = queue.indexOf(item);
    setQueue(queue => queue.slice(itemIndex + 1));

    // set current has to come last otherwise queue might not be empty when it
    // tries to get a recommended
    setCurrent(item);
  }

  const handleRemove = (index: number) => {
    setQueue(queue => queue.filter((_, i) => i !== index))
  }

  return <div className="p-4 mt-2">
    <h2 className="text-gray-700 font-medium">Queue</h2>
    <Reorder.Group
      onReorder={setQueue}
      values={queue}
    >
      {queue.map((item, index) => (
        <Reorder.Item
          key={item.videoId} className="flex w-full py-0.5 items-center text-gray-900"
          value={item}
          dragListener={draggable}
          onDragEnd={() => setDraggable(false)}
        >

          <button onClick={() => handleItem(index)}
            className="flex-1 w-0"
          >
            <p className="text-left truncate w-full">
              {item.title}
            </p>
          </button>
          <button className="p-2"
            onClick={() => handleRemove(index)}
          >
            <XIcon className="w-4 h-4" />
          </button>
          <MenuIcon
            className="w-4 h-4 cursor-grab"
            onMouseEnter={() => setDraggable(true)}
            onMouseLeave={() => setDraggable(false)}
            onTouchStart={() => setDraggable(true)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  </div>
}
