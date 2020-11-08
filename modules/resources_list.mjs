import ResourcesApi from "./resources_api.mjs";

export default class ResourcesList {
  static all() {
    return ResourcesApi.get('resource_list') || []
  }

  static add(name) {
    let list = this.all()
    if(list.includes(name)) return;
    list.push(name)
    ResourcesApi.set('resource_list', list)
  }

  static remove(name) {
    let list = this.all()
    if(!list.includes(name)) return;
    list.splice(list.indexOf(name), 1)
    ResourcesApi.set('resource_list', list)
  }
}
