export class Container {
  private services = new Map<string, any>();

  register<T>(key: string, instance: T) {
    this.services.set(key, instance);
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) throw new Error(`Service ${key} not found`);
    return service;
  }

  has(key: string) {
    return this.services.has(key);
  }
}

export const container = new Container();