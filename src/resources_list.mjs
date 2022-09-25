export default class ResourcesList {
  static all() {
    return window.pr.api.get('resource_list') || []
  }

  static add(name) {
    let list = this.all()
    if(list.includes(name)) return
    list.push(name)
    window.pr.api.set('resource_list', list)
    window.pr.api.update_positions()
  }

  static remove(name) {
    let list = this.all()
    if(!list.includes(name)) return
    list.splice(list.indexOf(name), 1)
    window.pr.api.set('resource_list', list)
    window.pr.api.update_positions()
  }
}
