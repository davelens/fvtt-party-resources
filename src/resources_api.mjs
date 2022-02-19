import ResourcesList from "./resources_list.mjs";
import ExtraTypes from '../../settings-extender/settings-extender.js'

export default class ResourcesApi {
  notify_chat(name, value, new_value) {
    if(!this.get(name.concat('_notify_chat')) || new_value == value) return;
    const color = new_value >= value ? 'green' : 'red'
    const resource = this.get(name.concat('_name'))
    if(typeof resource == 'undefined') return;

    let jump = new String(new_value-value)
    if(jump > 0) jump = '+'.concat(jump)

    let message = `<div class="fvtt-party-resources-chat-notification">${this.get(name.concat('_notify_chat_message'))} <table><tr><td>${resource}</td><td><span class="${color}">${new_value}</span> <span class="small">(${jump})</span></td></tr></table></div>`
    ChatMessage.create({content: message})

    window.pr.dashboard.redraw()
  }

  decrement(name, jump) {
    if(typeof jump == 'undefined') jump = 1
    let value = this.get(name)
    let min = this.get(name.concat('_min'))
    let exceeds_boundary = (typeof min == "number") && (value - jump) < min
    let new_value = exceeds_boundary ? min : value - jump
    this.set(name, new_value, { notify: true })
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
    this.set(name, new_value, { notify: true })
  }

  register_setting(name, options) {
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

  register_resource(resource) {
    this.register_setting(resource)
    this.register_setting(resource.concat('_name'))
    this.register_setting(resource.concat('_icon'), { default: '', type: ExtraTypes.FilePickerImage })
    this.register_setting(resource.concat('_use_icon'), { default: false })
    this.register_setting(resource.concat('_visible'), { default: true })
    this.register_setting(resource.concat('_notify_chat'), { default: true })
    this.register_setting(resource.concat('_notify_chat_message'), { default: "A resource value has changed." })
    this.register_setting(resource.concat('_max'))
    this.register_setting(resource.concat('_min'))
    this.register_setting(resource.concat('_player_managed'), { default: false })
  }

  resources() {
    let results = []

    ResourcesList.all().forEach((resource, index) => {
      if(resource == '') return ResourcesList.remove(resource)

      this.register_resource(resource)

      results.push({
        id: resource,
        value: this.get(resource),
        name: this.get(resource.concat('_name')),
        max_value: this.get(resource.concat('_max')),
        min_value: this.get(resource.concat('_min')),
        icon: this.get(resource.concat('_icon')),
        icon_on_top: this.get('icon_images_orientation') == 'on_top',
        use_icon: this.get(resource.concat('_use_icon')),
        player_managed: this.get(resource.concat('_player_managed')),
        manageable: game.user.isGM || this.get(resource.concat('_player_managed')),
        visible: this.get(resource.concat('_visible')),
        notify_chat: this.get(resource.concat('_notify_chat')),
        notify_chat_message: this.get(resource.concat('_notify_chat_message')),
        visible_for_players: game.user.isGM || this.get(resource.concat('_visible')),
        is_gm: game.user.isGM,
        allowed_to_modify_settings: game.permissions.SETTINGS_MODIFY.includes(1)
      })
    })

    return { resources: results }
  }

  set(name, value, options) {
    if(typeof options != 'undefined' && options['notify']) {
      let old_value = this.get(name)
      this.notify_chat(name, old_value, value)
    }

    game.settings.set('fvtt-party-resources', name, value)
  }
}
