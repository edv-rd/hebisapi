import categories from "../Categories";

interface SidebarProps {
  handleShownCategory: (type: string) => void;
}

function Sidebar({ handleShownCategory }: SidebarProps) {
  const uniqueCategoryTypes = Array.from(
    new Set(categories.map((c) => c.type))
  );

  return (
    <div className="flex flex-wrap gap-2 p-2 max-w-full">
      <div>
        <button
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => handleShownCategory("")}
        >
          Visa alla
        </button>
      </div>
      {uniqueCategoryTypes.map((type) => (
        <div key={type}>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleShownCategory(type)}
          >
            {type}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
