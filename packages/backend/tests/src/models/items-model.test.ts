import axios from "axios";
import config from "config";
import { getItemDetail, searchItems } from "~/models/items-model";

import SearchResponseJson from "~tests/fixtures/search-response.json";
import SearchResponseGibberishJson from "~tests/fixtures/search-response-gibberish.json";
import SearchResponseExpressJson from "~tests/fixtures/search-response-express.json";
import ItemDetailJson from "~tests/fixtures/item-detail.json";
import ItemDetailDescriptionJson from "~tests/fixtures/item-detail-description.json";
import ItemDetailExpressJson from "~tests/fixtures/item-detail-express.json";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ItemsModel", () => {
  describe("searchItems", () => {
    beforeAll(() => {
      mockedAxios.get.mockResolvedValue({ data: SearchResponseJson });
    });

    it("calls axios once with the correct url", async () => {
      await searchItems("zapatos");
      const expectedUrl = `${config.get("api")}/sites/MLA/search?q=zapatos`;

      expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it("returns no more than 4 items", async () => {
      const response = await searchItems("zapatos");

      expect(response.items?.length).toBeLessThanOrEqual(4);
    });

    it("returns correct structure", async () => {
      const response = await searchItems("zapatos");

      expect(response).toEqual(SearchResponseExpressJson);
    });

    it("does not return items nor categories when api response is also empty", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: SearchResponseGibberishJson });
      const response = await searchItems("wjiiojwerojiweoiwer");

      expect(response.categories).toEqual(undefined);
      expect(response.items).toEqual(undefined);
    });
  });

  describe("getItemDetail", () => {
    beforeAll(() => {
      jest.resetAllMocks();

      mockedAxios.get.mockImplementation(async (url) => {
        if (url.includes("/description")) return { data: ItemDetailDescriptionJson };

        return { data: ItemDetailJson };
      });
    });

    it("calls axios twice with correct urls", async () => {
      const id = "MLA911456292";
      await getItemDetail(id);

      const expectedUrl = `${config.get("api")}/items/${id}`;

      expect(mockedAxios.get.mock.calls).toEqual([[expectedUrl], [expectedUrl + "/description"]]);
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    it("returns correct structure", async () => {
      const response = await getItemDetail("MLA911456292");

      expect(response).toEqual(ItemDetailExpressJson);
    });

    it("does not return an item when the item with given id does not exist", async () => {
      mockedAxios.get.mockRejectedValueOnce("");
      const response = await getItemDetail("wjiiojwerojiweoiwer");

      expect(response.item).toEqual(undefined);
    });
  });
});
