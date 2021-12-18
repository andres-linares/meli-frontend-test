import express from "express";
import queryStringValidator from "../middleware/validators/query-string";
import { getItemDetail, searchItems } from "../models/items-model";

const router = express.Router();

router.get("/", queryStringValidator, async (req, res) => {
  const { query } = req.query;

  try {
    const response = await searchItems(query as string);

    res.json(response);
  } catch (e) {
    const error = "Something went wrong while searching products";
    res.status(400).json({ error, message: e });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getItemDetail(id);

    res.json(response);
  } catch (e) {
    const error = "Something went wrong while obtaining product detail";
    res.status(400).json({ error, message: e });
  }
});

export default router;
