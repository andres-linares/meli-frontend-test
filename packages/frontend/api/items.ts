import config from "config";

const baseUrl = config.get("api") as string;

const fetchItems = async (query: string) => {
  const url = `${baseUrl}/items?q=${query}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const fetchItemDetail = async (id: string) => {
  const url = `${baseUrl}/items/${id}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export { fetchItems, fetchItemDetail };
