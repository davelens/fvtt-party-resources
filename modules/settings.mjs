import ResourcesApi from "./resources_api.mjs";

export default class ModuleSettings {
  static register() {
    ResourcesApi.register('resource_list')
  };
}
