interface Category {
  category: string;
  type: string;
  name: string;
  info: string;
}

const categories: Category[] = [
  {
    category: "nickname",
    name: "Discord-namn",
    info: "Namn du får på discord (max 32 tecken)",
    type: "nickname",
  },
  {
    category: "nagonsomverb",
    name: "Någon som verb?",
    info: "Någon som verb",
    type: "nagonsom",
  },
  {
    category: "nagonsomobjekt",
    name: "Någon som ... objekt?",
    info: "Någon som objekt",
    type: "nagonsom",
  },
  {
    category: "holestatus",
    name: "Hålstatus",
    info: "Status på hål",
    type: "holestatus",
  },
  {
    category: "skribent-fornamn",
    name: "Skribent-förnamn",
    info: "Förnamn till skribent",
    type: "skribent",
  },
  {
    category: "skribent-efternamn",
    name: "Skribent-efternamn",
    info: "Efternamn till skribent",
    type: "skribent",
  },
  {
    category: "headline_person",
    name: "Headline-person",
    info: "Person till headline",
    type: "headline",
  },
  {
    category: "headline_aktivitet",
    name: "Headline-aktiviteter",
    info: "Aktiviteter till headline",
    type: "headline",
  },
  {
    category: "headline_plats",
    name: "Headline-platser",
    info: "Platser till headline",
    type: "headline",
  },
  {
    category: "headline_geografi",
    name: "Headline-geografier",
    info: "Geografier till headline",
    type: "headline",
  },
  {
    category: "tidning1",
    name: "Tidningsförled",
    info: "Förled till tidning",
    type: "tidning",
  },
  {
    category: "tidning2",
    name: "Tidningsefterled",
    info: "Efterled till tidning",
    type: "tidning",
  },
  {
    category: "headline_uppmaning",
    name: "Uppmaning",
    info: "Uppmaning - målgrupp - aktiviteter - tidplats",
    type: "opinion 1",
  },
  {
    category: "headline_målgrupp",
    name: "Målgrupp",
    info: "Uppmaning - målgrupp - aktiviteter - tidplats",
    type: "opinion 1",
  },
  {
    category: "headline_aktiviteter",
    name: "Aktiviteter",
    info: "Uppmaning - målgrupp - aktiviteter - tidplats",
    type: "opinion 1",
  },
  {
    category: "headline_tidplats",
    name: "Tid eller plats",
    info: "Uppmaning - målgrupp - aktiviteter - tidplats",
    type: "opinion 1",
  },
  {
    category: "koncept",
    name: "Koncept",
    info: "Koncept - retorisk fråga?",
    type: "opinion 2",
  },
  {
    category: "retorisk_fråga",
    name: "Retorisk fråga",
    info: "Koncept - retorisk fråga?",
    type: "opinion 2",
  },
  {
    category: "person",
    name: "Person",
    info: "Nej, person, det är inte ord med företeelse",
    type: "opinion 3",
  },
  {
    category: "ord",
    name: "Ord",
    info: "Nej, person, det är inte ord med företeelse",
    type: "opinion 3",
  },
  {
    category: "företeelse",
    name: "Företeelse",
    info: "Nej, person, det är inte ord med företeelse",
    type: "opinion 3",
  },
  {
    category: "problemet",
    name: "Problemet",
    info: "Lösningen på problemet är enkel - lösning",
    type: "opinion 4",
  },
  {
    category: "lösning",
    name: "Lösning",
    info: "Lösningen på problemet är enkel - lösning",
    type: "opinion 4",
  },
];

export default categories;
