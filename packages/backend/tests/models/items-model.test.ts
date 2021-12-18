import axios from "axios";
import config from "config";
import { searchItems } from "../../src/models/items-model";
import SearchResponseJson from "../fixtures/search-response.json";
import SearchResponseExpressJson from "../fixtures/search-response-express.json";

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

      expect(response.items.length).toBeLessThanOrEqual(4);
    });

    it("returns correct structure", async () => {
      const response = await searchItems("zapatos");

      expect(response).toEqual(SearchResponseExpressJson);
    });
  });
});
