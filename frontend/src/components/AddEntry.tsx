import React, { useState } from "react";
import { addEntry } from "../utils/apiGet";

function AddEntry({ category }) {
  const [formEntry, setFormEntry] = useState("");

  async function handleAddEntry() {
    await addEntry(category, formEntry);
  }

  return (
    <div className="flex">
      <input
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        value={formEntry}
        onChange={(e) => setFormEntry(e.target.value)}
        placeholder="Add entry"
      />
      <button
        onClick={handleAddEntry}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add entry
      </button>
    </div>
  );
}

export default AddEntry;
