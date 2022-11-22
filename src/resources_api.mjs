import ResourcesList from "./resources_list.mjs";
import ActorDnd5eResources from "./actor_dnd5e_resources.mjs";
import ExtraTypes from '../../settings-extender/settings-extender.js'

export default class ResourcesApi {
  async notify_chat(name, value, new_value) {
    if(!this.get(name.concat('_notify_chat')) || new_value == value) return;
    const color = new_value >= value ? 'green' : 'red'
    const resource = this.get(name.concat('_name'))
    if(typeof resource == 'undefined') return;

    let jump = new String(new_value-value)
    if(jump > 0) jump = '+'.concat(jump)

    let message = this.get(name.concat('_notify_chat_increment_message'))
    if(new_value < value) message = this.get(name.concat('_notify_chat_decrement_message'))

    const template = 'modules/fvtt-party-resources/src/views/notification.html'
    const notification_html = await renderTemplate(template, {
      message: message,
      resource: resource,
      color: color,
      new_value: new_value,
      jump: jump
    })

    return ChatMessage.create({content: notification_html})
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
    // This try/catch should make sure users can still access the dashboard
    // when any validation errors trigger upon setting retrieval due to
    // Foundry v10's DataModel changes.
    try {
      return game.settings.get('fvtt-party-resources', name)
    } catch(error) {
      if(error.errors && !Object.getOwnPropertyNames(error.errors).equals(['Setting.value'])) return

      if(name.includes('_name'))
        return 'RENAME ME'

      if(name.includes('_min'))
        return -100

      if(name.includes('_max'))
        return 100

      return 0
    }
  }

  increment(name, jump) {
    if(typeof jump == 'undefined') jump = 1
    let value = this.get(name)
    let max = this.get(name.concat('_max'))
    let exceeds_boundary = (typeof max == "number") && (value + jump) > max
    let new_value = exceeds_boundary ? max : value + jump
    this.set(name, new_value, { notify: true })
  }

  is_system_specific_resource(id) {
    return this.get(id.concat('_system_type')) != ""
  }

  register_setting(name, options) {
    let properties = {
      scope: 'world',
      config: false,
      onChange: value => {
        window.pr.dashboard.redraw()
        window.pr.status_bar.render()
      }
    }

    game.settings.register(
      'fvtt-party-resources',
      name,
      mergeObject(properties, options || {})
    )
  }

  register_resource(resource) {
    this.register_setting(resource, { type: Number, default: 0 })
    this.register_setting(resource.concat('_name'), { type: String, default: '' })
    this.register_setting(resource.concat('_icon'), { type: ExtraTypes.FilePickerImage, default: '' })
    this.register_setting(resource.concat('_use_icon'), { Type: Boolean, default: false })
    this.register_setting(resource.concat('_visible'), { Type: Boolean, default: true })
    this.register_setting(resource.concat('_notify_chat'), { Type: Boolean, default: false })
    this.register_setting(resource.concat('_notify_chat_increment_message'), { Type: String, default: "A resource value has increased." })
    this.register_setting(resource.concat('_notify_chat_decrement_message'), { Type: String, default: "A resource value has decreased." })
    this.register_setting(resource.concat('_max'), { Type: Number, default: 100 })
    this.register_setting(resource.concat('_min'), { Type: Number, default: -100 })
    this.register_setting(resource.concat('_player_managed'), { type: Boolean, default: false })
    this.register_setting(resource.concat('_position'), { type: Number, default: ResourcesList.all().length + 1 })
    // We need this one to store specific item resource names into when filtering
    // for system-specific resources.
    this.register_setting(resource.concat('_system_type'), { type: String, default: '' })
    this.register_setting(resource.concat('_system_name'), { type: String, default: '' })
  }

  resources() {
    let results = []
    let data = ResourcesList.all().sort((a, b) => {
      this.register_resource(a)
      this.register_resource(b)
      return this.get(a.concat('_position')) - this.get(b.concat('_position'))
    })

    data.forEach((resource, index) => {
      if(resource == '') return ResourcesList.remove(resource)

      this.register_resource(resource)

      if(this.is_system_specific_resource(resource)) {
        const old_value = this.get(resource)
        const new_value = ActorDnd5eResources.count(
          this.get(resource.concat('_system_type')),
          this.get(resource.concat('_system_name'))
        )

        this.set(resource, new_value, { notify: old_value != new_value })
      }

      results.push({
        id: resource,
        value: this.get(resource),
        position: this.get(resource.concat('_position')),
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
        notify_chat_increment_message: this.get(resource.concat('_notify_chat_increment_message')),
        notify_chat_decrement_message: this.get(resource.concat('_notify_chat_decrement_message')),
        visible_for_players: game.user.isGM || this.get(resource.concat('_visible')),
        is_regular_resource: !this.is_system_specific_resource(resource),
        is_gm: game.user.isGM,
        allowed_to_modify_settings: game.permissions.SETTINGS_MODIFY.includes(1),
        system_type: this.get(resource.concat('_system_type')),
        system_name: this.get(resource.concat('_system_name'))
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

  update_positions() {
    // this.resources() comes pre-sorted according to their position attribute,
    // so looping and updating the value should be sufficient.
    this.resources().resources.forEach((resource, index) => {
      this.set(`${resource.id}_position`, index+1)
    })
  }

}
