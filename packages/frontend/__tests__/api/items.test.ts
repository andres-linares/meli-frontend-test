import config from 'config';
import { fetchItemDetail, fetchItems } from '../../api/items';

const baseUrl = config.get('api');

describe("itemsAPI", () => {
  describe("fetchItems", () => {
    it("calls fetch with the proper url", async () => {
      const url = `${baseUrl}/items?q=test`;
      await fetchItems('test');

      expect(fetch).toHaveBeenCalledWith(url);
    });
  });

  describe("fetchItemDetail", () => {
    it("calls fetch with the proper url", async () => {
      await fetchItemDetail('test');
      const url = `${baseUrl}/items/test`;

      expect(fetch).toHaveBeenCalledWith(url);
    });
  });
});

export default {};
