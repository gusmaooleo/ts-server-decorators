import 'reflect-metadata';

const ROUTES_KEY = Symbol('routes');

export function Controller(basePath: string) {
  return (target: any) => {
    Reflect.defineMetadata('basePath', basePath, target);
    if (!Reflect.hasMetadata(ROUTES_KEY, target)) {
      Reflect.defineMetadata(ROUTES_KEY, [], target);
    }
  };
}

export function Get(path: string) {
  return (target: any, propertyKey: string) => {
    const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
    routes.push({ method: 'get', path, handlerName: propertyKey });
    Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
  };
}

export function Post(path: string) {
  return (target: any, propertyKey: string) => {
    const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
    routes.push({ method: 'post', path, handlerName: propertyKey });
    Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
  };
}

export function Put(path: string) {
  return (target: any, propertyKey: string) => {
    const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
    routes.push({ method: 'put', path, handlerName: propertyKey });
    Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
  };
}

export function Delete(path: string) {
  return (target: any, propertyKey: string) => {
    const routes = Reflect.getMetadata(ROUTES_KEY, target.constructor) || [];
    routes.push({ method: 'delete', path, handlerName: propertyKey });
    Reflect.defineMetadata(ROUTES_KEY, routes, target.constructor);
  };
}

export { ROUTES_KEY };
