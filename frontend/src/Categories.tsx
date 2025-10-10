import categories from "./categories.json";

export interface Category {
  category: string;
  name: string;
  info: string;
  type: string;
}

export default categories as Category[];
