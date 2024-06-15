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
    category: "headline_person",
    name: "Headline-person",
    info: "Person till headline",
    id: 2,
  },
  {
    category: "headline_aktivitet",
    name: "Headline-aktiviteter",
    info: "Aktiviteter till headline",
    id: 3,
  },
  {
    category: "headline_plats",
    name: "Headline-platser",
    info: "Platser till headline",
    id: 4,
  },
  {
    category: "headline_geografi",
    name: "Headline-geografier",
    info: "Geografier till headline",
    id: 5,
  },
];

export default categories;
