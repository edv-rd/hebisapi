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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!formEntry.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newEntry = await addEntry({
        entry: formEntry,
        category,
        active: true,
      });
      onEntryAdded(newEntry);
      setFormEntry("");
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleAddEntry} className="flex flex-col gap-2">
      <input
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
        type="text"
        value={formEntry}
        onChange={(e) => setFormEntry(e.target.value)}
        placeholder="Add entry"
        maxLength={category === "nickname" ? 32 : undefined}
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add entry"}
      </button>
    </form>
  );
}

export default AddEntry;
