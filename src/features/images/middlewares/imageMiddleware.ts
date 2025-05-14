import { NextFunction, Request, Response } from "express";

export function imageMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.url)
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}