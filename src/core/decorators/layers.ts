import { container } from "../container";

function createLayerDecorator(layerKey?: string) {
  return function (target: any) {
    if (!container.has(layerKey ?? target.name)) {
      container.register(layerKey ?? target.name, new target());
    }
  };
}

export const Service = createLayerDecorator;
export const Repository = createLayerDecorator;
export const Factory = createLayerDecorator;
export const Helper = createLayerDecorator;
export const Adapter = createLayerDecorator;
