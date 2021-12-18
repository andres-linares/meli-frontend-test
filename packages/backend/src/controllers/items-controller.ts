import express from "express";
import queryStringValidator from "../middleware/validators/query-string";
import { getItemDetail, searchItems } from "../models/items-model";
import idParamStringValidator from "../middleware/validators/id-param-string";

const router = express.Router();

router.get("/", queryStringValidator, async (req, res) => {
  const { query } = req.query;

  try {
    const response = await searchItems(query as string);

    res.json(response);
  } catch (e) {
    res.status(400).json({ error: "Something went wrong while searching products", message: e });
  }
});

router.get("/:id", idParamStringValidator, async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getItemDetail(id);

    res.json(response);
  } catch (e) {
    res
      .status(400)
      .json({ error: "Something went wrong while obtaining product detail", message: e });
  }
});

export default router;
