interface Category {
  category: string;
  name: string;
  info: string;
  id: number;
}

const categories: Category[] = [
  {
    category: "nickname",
    name: "Discord-namn",
    info: "Namn du får på discord (max 32 tecken)",
    id: 0,
  },
];

export default categories;
