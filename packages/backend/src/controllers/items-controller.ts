import express, { Request, Response } from "express";
import queryStringValidator from "../middleware/validators/query-string";
import { getItemDetail, searchItems } from "../models/items-model";
import redis from "../redis-client";

const router = express.Router();

const searchEndpoint = async (req: Request, res: Response) => {
  const { q: query } = req.query;

  const cacheQuery = await redis.get(`query-${query}`);
  
  if (cacheQuery) {
    res.json(JSON.parse(cacheQuery));
    return;
  }

  try {
    const response = await searchItems(query as string);
    await redis.set(`query-${query}`, JSON.stringify(response));

    res.json(response);
  } catch (e) {
    const error = "Something went wrong while searching products";
    res.status(400).json({ error, message: e });
  }
}

const itemEndpoint = async (req: Request, res: Response) => {
  const { id } = req.params;

  const cacheQuery = await redis.get(`item-${id}`);
  
  if (cacheQuery) {
    res.json(JSON.parse(cacheQuery));
    return;
  }

  try {
    const response = await getItemDetail(id);
    await redis.set(`item-${id}`, JSON.stringify(response));

    res.json(response);
  } catch (e) {
    const error = "Something went wrong while obtaining product detail";
    res.status(400).json({ error, message: e });
  }
}

router.get("/", queryStringValidator, searchEndpoint);
router.get("/:id", itemEndpoint);

export default router;
export { searchEndpoint, itemEndpoint }
