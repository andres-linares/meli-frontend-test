import config from "config";
import { DetailResponse, SearchResponse } from "@meli/backend/src/types/responses";

const baseUrl = config.get("api") as string;

const fetchItems = async (query: string): Promise<SearchResponse> => {
  const url = `${baseUrl}/items?q=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const fetchItemDetail = async (id: string): Promise<DetailResponse> => {
  const url = `${baseUrl}/items/${id}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export { fetchItems, fetchItemDetail };
