import { RequestHandler } from "express";
import { ROUTES_KEY } from "./controller";
import { RouteDefinition } from "./types";

function createMethodDecorator(method: RouteDefinition["method"]) {
  return (path: string) => {
    return (target: any, propertyKey: string) => {
      const routes: RouteDefinition[] =
        Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];

      routes.push({
        method,
        path,
        handlerName: propertyKey,
        middlewares: [],
      });

      Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
    };
  };
}

export function Middleware(...fns: RequestHandler[]) {
  return (target: any, propertyKey: string) => {
    const routes: RouteDefinition[] =
      Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];

    const route = routes.find(r => r.handlerName === propertyKey);
    if (!route) {
      throw new Error(`@Middleware usado sem @Get/@Post em ${propertyKey}`);
    }

    route.middlewares.push(...fns);
    Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
  };
}

export const Get = createMethodDecorator("get");
export const Post = createMethodDecorator("post");
export const Put = createMethodDecorator("put");
export const Delete = createMethodDecorator("delete");
