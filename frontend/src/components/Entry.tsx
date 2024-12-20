import { useState } from "react";
import { hideEntry } from "../utils/apiGet";

interface EntryProps {
  entry: string;
  id: string;
  onEntryHidden: (id: string) => void;
  active: boolean;
}

function Entry({ entry, id, onEntryHidden, active }: EntryProps) {
  const [loading, setLoading] = useState(false);

  const handleHideEntry = async (): Promise<void> => {
    setLoading(true);
    try {
      await hideEntry({ id: id });
      onEntryHidden(id);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-indigo-300 divide-y divide-slate-200 gap-4 flex content-around">
      <p
        className={`text-lg ${
          active ? "text-red-500" : "text-gray-500"
        }  font-extrabold hover:cursor-pointer `}
        onClick={handleHideEntry}
      >
        {loading ? "..." : "x"}
      </p>
      <p
        className={`${active ? "" : "text-gray-500"} text-lg ${
          active ? "" : "line-through"
        }`}
      >
        {entry}
      </p>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Entry;
