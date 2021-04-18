import ResourcesList from "./resources_list.mjs";

export default class ResourcesApi {
  notify_chat(name, value, new_value) {
    if(!this.get(name.concat('_notify_chat')) || new_value == value) return;
    let resource = this.get(name.concat('_name'))
    let color = new_value >= value ? 'green' : 'red'
    let message = `<div class="fvtt-party-resources-chat-notification">A resource value has changed. <table><tr><td>${resource}</td><td class="${color}">${new_value}</td></tr></table></div>`
    ChatMessage.create({content: message})

    window.pr.dashboard.redraw()
  }

  decrement(name, jump) {
    if(typeof jump == 'undefined') jump = 1
    let value = this.get(name)
    let min = this.get(name.concat('_min'))
    let exceeds_boundary = (typeof min == "number") && (value - jump) < min
    let new_value = exceeds_boundary ? min : value - jump
    this.set(name, new_value)
    this.notify_chat(name, value, new_value)
  }

  get(name) {
    return game.settings.get('fvtt-party-resources', name)
  }

  increment(name, jump) {
    if(typeof jump == 'undefined') jump = 1
    let value = this.get(name)
    let max = this.get(name.concat('_max'))
    let exceeds_boundary = (typeof max == "number") && (value + jump) > max
    let new_value = exceeds_boundary ? max : value + jump
    this.set(name, new_value)
    this.notify_chat(name, value, new_value)
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
      this.register(resource.concat('_notify_chat'), { default: true })
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
        notify_chat: this.get(resource.concat('_notify_chat')),
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
