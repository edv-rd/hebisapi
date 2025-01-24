import { useEffect, useState } from "react";
import { enableAll, hideAll, fetchAll } from "../utils/apiGet";
import Entry from "./Entry";
import AddEntry from "./AddEntry";

import Loading from "../lib/Loading";

interface Category {
  category: string;
  name: string;
  info: string;
}

interface EntryType {
  _id: string;
  entry: string;
  active: boolean;
}

interface EntriesProps {
  category: Category;
}

function Entries({ category }: EntriesProps) {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  async function fetchEntries() {
    setLoading(true);
    try {
      const result = await fetchAll(category.category);
      setEntries(result.response.entries);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, [category.category]);

  const handleEntryAdded = (newEntry: EntryType) => {
    console.log("handleEntryAdded");

    setEntries((prevEntries) => [newEntry, ...prevEntries]);
    console.dir(newEntry);
  };

  const handleEntryHidden = (id: string) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry._id === id ? { ...entry, active: !entry.active } : entry
      )
    );
  };

  return (
    <div className="p-6 gap-4 bg-white border">
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "show" : "hide"}
      </button>
      <button
        className="bg-blue-300 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded"
        onClick={async () => {
          setLoading(true);
          await enableAll(category.category).then(() => {
            fetchEntries();
            setLoading(false);
          });
        }}
      >
        enable all
      </button>
      <button
        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-3 border border-red-500 hover:border-transparent rounded"
        onClick={async () => {
          setLoading(true);
          await hideAll(category.category).then(() => {
            fetchEntries();
            setLoading(false);
          });
        }}
      >
        disable all
      </button>

      <h1 className="text-3xl font-extrabold">{category.name}</h1>
      <h2 className="text-1xl font-extrabold">{category.info}</h2>

      <div className={`${collapsed ? "hidden" : ""}`}>
        <AddEntry
          category={category.category}
          onEntryAdded={handleEntryAdded}
        />

        {loading ? (
          <Loading />
        ) : (
          <>
            {entries.map((entry) => (
              <Entry
                key={entry._id}
                id={entry._id}
                entry={entry.entry}
                active={entry.active}
                onEntryHidden={handleEntryHidden}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Entries;
