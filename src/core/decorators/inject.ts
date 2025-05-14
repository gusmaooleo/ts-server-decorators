import "reflect-metadata";

export const INJECT_KEY = Symbol("inject_props");

export function Inject(serviceKey: string) {
  return function (target: any, propertyKey: string) {
    const list: Array<{ propertyKey: string; serviceKey: string }> =
      Reflect.getMetadata(INJECT_KEY, target.constructor) || [];
    list.push({ propertyKey, serviceKey });
    Reflect.defineMetadata(INJECT_KEY, list, target.constructor);
  };
}
