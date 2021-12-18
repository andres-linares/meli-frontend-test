import { NextFunction, Request, Response } from "express";

const idParamStringValidator = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({ error: 'id parameter must be of type string' });
    return;
  }

  next();
};

export default idParamStringValidator;