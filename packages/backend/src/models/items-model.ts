import config from "config";
import axios from "axios";
import { DetailResponse, SearchResponse } from "../types/responses";
import signResponse from "../utils/sign-response";

const searchItems = async (query: string): Promise<SearchResponse> => {
  const baseUrl = config.get("api") as string;
  const response = (await axios.get(`${baseUrl}/sites/MLA/search?q=${query}`)).data;

  const items = response.results;
  const filteredItems = items.map((x: any) => {
    const condition = x.attributes.find((a: any) => a.id === "ITEM_CONDITION").value_name;

    return {
      id: x.id,
      title: x.title,
      picture: x.thumbnail,
      condition,
      free_shipping: x.shipping.free_shipping,
    };
  });

  return signResponse({
    categories: [],
    items: filteredItems,
  });
};

const getItemDetail = async (id: string): Promise<DetailResponse> => {
  const baseUrl = config.get("api") as string;

  const itemResponse = (await axios.get(`${baseUrl}/items/${id}`)).data;
  const itemDetailResponse = (await axios.get(`${baseUrl}/items/${id}/description`)).data;
  
  return {
    author:{
      name: config.get('author.name'),
      lastname: config.get('author.lastname')
    },
    item: {
      description: '',
      sold_quantity: 1,
    }
  }
};

export { searchItems, getItemDetail };
