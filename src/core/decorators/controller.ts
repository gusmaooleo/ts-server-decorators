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

export { ROUTES_KEY };
