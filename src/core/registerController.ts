import express from 'express';
import fg from 'fast-glob';
import { ROUTES_KEY } from '../decorators/controller';

export async function registerControllers(app: express.Express) {
  const files = await fg(['src/controller/*.ts']);
  console.log(files)
  for (let file of files) {
    file = file.replace("src", "..")
    console.log(file)
    const module = await import(file);
    const ControllerClass = Object.values(module)[0];
    const controllerInstance = new (ControllerClass as any)();

    const basePath = Reflect.getMetadata('basePath', ControllerClass as Object);
    const routes = Reflect.getMetadata(ROUTES_KEY, ControllerClass as Object) || [];

    routes.forEach(({ method, path, handlerName }: any) => {
      const handler = controllerInstance[handlerName].bind(controllerInstance);
      app[method](`${basePath}${path}`, handler);
    });
  }
}
