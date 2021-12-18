import { NextFunction, Request, Response } from "express";

const queryStringValidator = (req: Request, res: Response, next: NextFunction) => {
  const { q: query } = req.query;

  if (!query) {
    res.status(400).json({ error: 'query parameter is required' });
    return;
  }

  if (typeof query !== "string") {
    res.status(400).json({ error: 'query parameter must be of type string' });
    return;
  }

  next();
};

export default queryStringValidator;