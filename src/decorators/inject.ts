import { container } from '../core/container';

export function Inject(serviceKey: string) {
  return function (target: any, propertyKey: string) {
    const service = container.get(serviceKey);
    Object.defineProperty(target, propertyKey, {
      value: service
    });
  };
}
