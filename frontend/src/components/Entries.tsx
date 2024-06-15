import { useEffect, useState } from "react";
import { fetchAll } from "../utils/apiGet";
import Entry from "./Entry";
import AddEntry from "./AddEntry";

interface Category {
  category: string;
  name: string;
  info: string;
  id: number;
}

interface EntryType {
  _id: string;
  entry: string;
}

interface EntriesProps {
  category: Category;
}

function Entries({ category }: EntriesProps) {
  const [entries, setEntries] = useState<EntryType[]>([]);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const result = await fetchAll(category.category);
        setEntries(result.response.entries);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    }
    fetchEntries();
  }, [category.category]);

  return (
    <div className="p-6 gap-4 bg-white border">
      <h1 className="text-3xl font-extrabold">{category.name}</h1>
      <h2 className="text-1xl font-extrabold">{category.info}</h2>
      <AddEntry category={category.category} />
      <div className="border-indigo-300 divide-y divide-slate-200">
        {entries.map((entry) => (
          <Entry key={entry._id} entry={entry.entry} />
        ))}
      </div>
    </div>
  );
}

export default Entries;
