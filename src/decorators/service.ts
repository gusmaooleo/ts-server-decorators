import { container } from "../core/container";

export function Service(serviceKey?: string) {
  return function (target: any) {
    if (!container.has(serviceKey ?? target.name)) {
      container.register(serviceKey ?? target.name, new target());
    }
  };
}
