import ResourcesApi from "./resources_api.mjs";

export default class ModuleSettings {
  static register() {
    ResourcesApi.register('inspiration')
    ResourcesApi.register('desperation')
    ResourcesApi.register('influence_dice')
    ResourcesApi.register('max_inspiration', { default: 6 })
    ResourcesApi.register('max_desperation', { default: 6 })
    ResourcesApi.register('max_influence_dice', { default: 1 })
  };
}
