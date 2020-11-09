import ResourcesList from "./resources_list.mjs";

export default class ResourcesApi {
  decrement(name) {
    let value = this.get(name) - 1
    this.set(name, value > 0 ? value : 0)
  }

  get(name) {
    return game.settings.get('fvtt-party-resources', name)
  }

  increment(name) {
    let value = this.get(name)
    let max = this.get(name.concat('_max'))
    this.set(name, max && value >= max ? value : value + 1)
  }

  register(name, options) {
    let properties = {
      scope: "world",
      config: false,
      onChange: value => {
        if(PartyResourcesDashboard.rendered) {
          PartyResourcesDashboard.render(true)
          // I have no idea how to redraw a form so it fits itself to its
          // contents. Hence this is dumb workaround.
          setTimeout(() => {
            $('#fvtt-party-resources-dashboard').css({ width: 'auto', height: 'auto' })
          }, 1)
        }
      }
    }

    game.settings.register('fvtt-party-resources', name, mergeObject(properties, options || {}))
  }

  resources() {
    let results = []

    ResourcesList.all().forEach((resource, index) => {
      this.register(resource)
      this.register(resource.concat('_name'))
      this.register(resource.concat('_visible'), { default: true })
      this.register(resource.concat('_max'))

      results.push({
        id: resource,
        value: this.get(resource),
        name: this.get(resource.concat('_name')),
        max_value: this.get(resource.concat('_max')),
        visible: this.get(resource.concat('_visible')),
        is_gm: game.user.isGM
      })
    })

    return { resources: results }
  }

  set(name, value, options) {
    game.settings.set('fvtt-party-resources', name, value)
  }
}
