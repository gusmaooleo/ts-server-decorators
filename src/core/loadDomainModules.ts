import { container } from "./container";
import { INJECT_KEY } from "./decorators/inject";
import { pathToFileUrl } from "./utils/pathToFileUrl";
import fg from "fast-glob";

export async function loadDomainModules() {
  const patterns = ["src/**/{services,repositories,factories,helpers,adapters}/**/*.{ts,js}"];
  const files = await fg(patterns, { absolute: true });

  for (const file of files) {
    const url = pathToFileUrl(file);
    const module = await import(url);
    const Cls = module.default ?? Object.values(module)[0];
    if (typeof Cls !== "function") continue;

    const instance = new Cls();

    const injections: Array<{ propertyKey: string; serviceKey: string }> =
      Reflect.getMetadata(INJECT_KEY, Cls) || [];
    for (const { propertyKey, serviceKey } of injections) {
      (instance as any)[propertyKey] = container.get(serviceKey);
    }

    const key = Cls.name;
    container.register(key, instance);
  }
}
