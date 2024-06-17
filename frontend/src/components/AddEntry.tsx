import { useState } from "react";
import { addEntry } from "../utils/apiGet";

interface AddEntryProps {
  category: string;
  onEntryAdded: (newEntry: {
    _id: string;
    entry: string;
    active: boolean;
  }) => void;
}

function AddEntry({ category, onEntryAdded }: AddEntryProps) {
  const [formEntry, setFormEntry] = useState("");

  async function handleAddEntry() {
    try {
      const newEntry = await addEntry({
        entry: formEntry,
        category,
      });
      onEntryAdded(newEntry);
      setFormEntry(""); // Clear the input field after adding
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  return (
    <>
      <input
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        value={formEntry}
        onChange={(e) => setFormEntry(e.target.value)}
        placeholder="Add entry"
        maxLength={category === "nickname" ? 32 : undefined}
      />
      <button
        onClick={handleAddEntry}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add entry
      </button>
    </>
  );
}

export default AddEntry;
