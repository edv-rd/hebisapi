import categories from "../Categories";

interface SidebarProps {
  handleShownCategory: (type: string) => void; // Define a prop for handling entry hiding
}

function Sidebar({ handleShownCategory }: SidebarProps) {
  // Use a Set to keep track of unique category types
  const uniqueCategoryTypes = Array.from(
    new Set(categories.map((c) => c.type))
  );

  return (
    <div className="flex gap-4 p-4">
      <button
        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => handleShownCategory("")}
      >
        Visa alla
      </button>
      {uniqueCategoryTypes.map((type) => (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          key={type}
          onClick={() => handleShownCategory(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
