export default class ResourcesList {
  static all() {
    return PartyResourcesApi.get('resource_list') || []
  }

  static add(name) {
    let list = this.all()
    if(list.includes(name)) return
    list.push(name)
    PartyResourcesApi.set('resource_list', list)
  }

  static remove(name) {
    let list = this.all()
    if(!list.includes(name)) return
    list.splice(list.indexOf(name), 1)
    PartyResourcesApi.set('resource_list', list)
  }
}
