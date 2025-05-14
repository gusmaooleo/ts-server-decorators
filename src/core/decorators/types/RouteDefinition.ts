import { RequestHandler } from "express";

export type RouteDefinition = {
  method: "get" | "post" | "put" | "delete";
  path: string;
  handlerName: string;
  middlewares: RequestHandler[];
}