interface EntryProps {
  entry: string;
}

function Entry({ entry }: EntryProps) {
  return (
    <div className="gap-4">
      <p className="text-lg">{entry}</p>
    </div>
  );
}

export default Entry;
