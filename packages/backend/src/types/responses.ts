import { Author } from "./author";
import { Item, ItemDetail } from "./item";

export interface SearchResponse {
  author: Author;
  categories?: string[];
  items?: Item[];
}

export interface DetailResponse {
  author: Author;
  item?: ItemDetail;
}
