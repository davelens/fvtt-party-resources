import ResourcesList from "./resources_list.mjs";

export default class ResourcesApi {
  decrement(name, jump) {
    if(typeof jump == 'undefined') jump = 1
    let value = this.get(name)
    let min = this.get(name.concat('_min'))
    let exceeds_boundary = (typeof min == "number") && (value - jump) < min
    this.set(name, exceeds_boundary ? min : value - jump)
  }

  get(name) {
    return game.settings.get('fvtt-party-resources', name)
  }

  increment(name, jump) {
    if(typeof jump == 'undefined') jump = 1
    let value = this.get(name)
    let max = this.get(name.concat('_max'))
    let exceeds_boundary = (typeof max == "number") && (value + jump) > max
    this.set(name, exceeds_boundary ? max : value + jump)
  }

  register(name, options) {
    let properties = {
      scope: "world",
      config: false,
      onChange: value => window.pr.dashboard.redraw()
    }

    game.settings.register(
      'fvtt-party-resources',
      name,
      mergeObject(properties, options || {})
    )
  }

  resources() {
    let results = []

    ResourcesList.all().forEach((resource, index) => {
      if(resource == '') return ResourcesList.remove(resource)

      this.register(resource)
      this.register(resource.concat('_name'))
      this.register(resource.concat('_visible'), { default: true })
      this.register(resource.concat('_max'))
      this.register(resource.concat('_min'))
      this.register(resource.concat('_player_managed'))

      results.push({
        id: resource,
        value: this.get(resource),
        name: this.get(resource.concat('_name')),
        max_value: this.get(resource.concat('_max')),
        min_value: this.get(resource.concat('_min')),
        player_managed: this.get(resource.concat('_player_managed')),
        manageable: game.user.isGM || this.get(resource.concat('_player_managed')),
        visible: this.get(resource.concat('_visible')),
        visible_for_players: game.user.isGM || this.get(resource.concat('_visible')),
        is_gm: game.user.isGM,
        allowed_to_modify_settings: game.permissions.SETTINGS_MODIFY.includes(1)
      })
    })

    return { resources: results }
  }

  set(name, value, options) {
    game.settings.set('fvtt-party-resources', name, value)
  }
}
