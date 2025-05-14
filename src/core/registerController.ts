import express, { RequestHandler } from "express";
import fg from "fast-glob";
import "reflect-metadata";

import { ROUTES_KEY } from "./decorators/controller";
import { INJECT_KEY } from "./decorators/inject";
import { RouteDefinition } from "./decorators/types";
import { container } from "../core/container";
import { pathToFileUrl } from "./utils/pathToFileUrl";

export async function registerControllers(app: express.Express) {
  const files = await fg(["src/**/controller/**/*.{ts,js}"], {
    absolute: true,
  });

  for (const file of files) {
    const url = pathToFileUrl(file);
    const module = await import(url);
    const ControllerClass = module.default ?? Object.values(module)[0];
    if (typeof ControllerClass !== "function") continue;

    const controllerInstance = new ControllerClass();

    const injections: Array<{ propertyKey: string; serviceKey: string }> =
      Reflect.getMetadata(INJECT_KEY, ControllerClass) || [];
    for (const { propertyKey, serviceKey } of injections) {
      (controllerInstance as any)[propertyKey] = container.get(serviceKey);
    }

    const basePath: string =
      Reflect.getMetadata("basePath", ControllerClass) || "";
    const routes: RouteDefinition[] =
      Reflect.getMetadata(ROUTES_KEY, ControllerClass) || [];

    for (const { method, path: routePath, handlerName, middlewares } of routes) {
      const handler = (controllerInstance as any)[handlerName].bind(controllerInstance);

      const allHandlers: RequestHandler[] = [...middlewares, handler];
      app[method](`${basePath}${routePath}`, ...allHandlers);
    }
  }
}
