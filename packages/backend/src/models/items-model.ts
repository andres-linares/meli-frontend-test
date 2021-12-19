import config from "config";
import axios from "axios";
import { DetailResponse, SearchResponse } from "~/types/responses";
import signResponse from "~/utils/sign-response";

const searchItems = async (query: string): Promise<SearchResponse> => {
  const baseUrl = config.get("api") as string;
  const response = (await axios.get(`${baseUrl}/sites/MLA/search?q=${query}`)).data;

  const items = response.results;

  if (items.length === 0) {
    return signResponse({});
  }

  const filteredItems = items.slice(0, 4).map((item: any) => {
    const condition = item.attributes.find((attr: any) => attr.id === "ITEM_CONDITION").value_name;

    const splitItemPrice = item.price.toString().split(".");
    const itemPriceAmount = +splitItemPrice[0];
    const itemPriceDecimals = +splitItemPrice[1] || 0;

    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: itemPriceAmount,
        decimals: itemPriceDecimals,
      },
      picture: item.thumbnail,
      condition,
      free_shipping: item.shipping.free_shipping,
    };
  });

  const categoriesFilter = response.available_filters.find(
    (filter: any) => filter.id === "category"
  );
  const categories = categoriesFilter.values.map((cat: any) => cat.name);

  return signResponse({
    categories,
    items: filteredItems,
  });
};

const getItemDetail = async (id: string): Promise<DetailResponse> => {
  const baseUrl = config.get("api") as string;

  const promises = [
    axios.get(`${baseUrl}/items/${id}`),
    axios.get(`${baseUrl}/items/${id}/description`),
  ];

  try {
    const [itemResponse, descriptionResponse] = await Promise.all(promises);
    const item = itemResponse.data;
    const description = descriptionResponse.data;

    const itemPicture = item.pictures[0].url;
    const itemCondition = item.attributes.find(
      (attr: any) => attr.id === "ITEM_CONDITION"
    ).value_name;

    const splitItemPrice = item.price.toString().split(".");
    const itemPriceAmount = +splitItemPrice[0];
    const itemPriceDecimals = +splitItemPrice[1] || 0;

    return signResponse({
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: itemPriceAmount,
          decimals: itemPriceDecimals,
        },
        picture: itemPicture,
        condition: itemCondition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.text,
      },
    });
  } catch {
    return signResponse({});
  }
};

export { searchItems, getItemDetail };
