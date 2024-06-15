import { useState } from "react";
import { hideEntry } from "../utils/apiGet";

interface EntryProps {
  entry: string;
  id: string;
  onEntryHidden: (id: string) => void; // Define a prop for handling entry hiding
}

function Entry({ entry, id, onEntryHidden }: EntryProps) {
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleHideEntry = async (): Promise<void> => {
    setLoading(true); // Set loading to true when starting hide operation
    try {
      await hideEntry({ id: id });
      onEntryHidden(id);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setLoading(false); // Set loading to false after hide operation completes
    }
  };

  return (
    <div className="gap-4 flex content-around">
      <p
        className="text-lg text-red-500 font-extrabold hover:cursor-pointer"
        onClick={handleHideEntry}
      >
        {loading ? "..." : "x"}
      </p>
      <p className="text-lg">{entry}</p>
      {loading && <p>Loading...</p>} {/* Display loading message or spinner */}
    </div>
  );
}

export default Entry;
