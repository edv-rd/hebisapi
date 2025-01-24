import "./App.css";

import Entries from "./components/Entries";
import Sidebar from "./components/Sidebar";

import categories from "./Categories";
import { SetStateAction, useState } from "react";

function App() {
  const [shownCategory, setShownCategory] = useState("nickname");

  const handleShownCategory = (category: SetStateAction<string>) => {
    setShownCategory(category);
  };

  return (
    <>
      <Sidebar handleShownCategory={handleShownCategory} />
      <div className="flex flex-row p-6 gap-3">
        {categories
          .filter((c) => shownCategory === "" || c.type === shownCategory)
          .map((c) => {
            return <Entries key={c.name} category={c} />;
          })}
      </div>
    </>
  );
}

export default App;
