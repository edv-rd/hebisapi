import "./App.css";

import Entries from "./components/Entries";

import categories from "./Categories";

function App() {
  return (
    <div className="flex bg-slate-500 flex-row p-6">
      {categories.map((c) => {
        return <Entries key={c.id} category={c} />;
      })}
    </div>
  );
}

export default App;
