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
  {
    category: "skribent-fornamn",
    name: "Skribent-förnamn",
    info: "Förnamn till skribent",
    id: 1,
  },
  {
    category: "skribent-efternamn",
    name: "Skribent-efternamn",
    info: "Efternamn till skribent",
    id: 2,
  },
];

export default categories;
