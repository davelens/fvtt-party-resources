import ResourcesList from "./resources_list.mjs";

export default class ResourcesApi {
  decrement(name) {
    this.set(name, this.get(name) - 1)
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
      onChange: value => PartyResourcesDashboard.redraw()
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
      this.register(resource)
      this.register(resource.concat('_name'))
      this.register(resource.concat('_visible'), { default: true })
      this.register(resource.concat('_max'))
      this.register(resource.concat('_player_managed'))

      results.push({
        id: resource,
        value: this.get(resource),
        name: this.get(resource.concat('_name')),
        max_value: this.get(resource.concat('_max')),
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
