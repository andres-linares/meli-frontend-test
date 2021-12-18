import express from "express";
import queryStringValidator from "../middleware/validators/query-string";
import { getItemDetail, searchItems } from "../models/items-model";
import idParamStringValidator from "../middleware/validators/id-param-string";

const router = express.Router();

router.get("/", queryStringValidator, async (req, res) => {
  const { query } = req.query;
  const response = await searchItems(query as string);

  res.json(response);
});

router.get("/:id", idParamStringValidator, async (req, res) => {
  const { id } = req.params;
  const response = await getItemDetail(id);

  res.json(response);
});

export default router;
