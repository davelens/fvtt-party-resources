import ResourcesList from "./../resources_list.mjs";

export default class ResourceForm extends FormApplication {
  activateListeners(html) {
    super.activateListeners(html)

    html.on('change', '#notify_chat', event => {
      $('#notify_chat_message')
        .prop('disabled', !$(event.target).prop('checked'))
    })

    html.on('click', '#configure-permissions', event => {
      event.preventDefault()

      let permissions = game.settings.get('core', 'permissions')
      permissions.SETTINGS_MODIFY.push(1)
      game.settings.set('core', 'permissions', permissions)

      if(this.id == 'edit-resource-form') {
        this.submit()
        setTimeout(() => {
          $(`a.edit[data-setting="${this.object.identifier}"]`).trigger('click')
        }, 250)
      } else {
        setTimeout(() => { this.render(true) }, 250)
      }
    })
  }

  /**
   * Default Application options
   *
   * @returns {Object}
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-party-resources-form",
      classes: ["fvtt-party-resources"],
      template: "modules/fvtt-party-resources/templates/resource_form.html",
      width: 400,
      minimizable: false,
      closeOnSubmit: true
    })
  }

  getData(object) {
    let defaults = {
      id_disabled: false,
      allowed_to_modify_settings: game.permissions.SETTINGS_MODIFY.includes(1)
    }
    return mergeObject(defaults, this.object)
  }

  /**
   * Called "on submit". Handles saving Form's data
   *
   * @param event
   * @param formData
   * @private
   */
  async _updateObject(event, data) {
    let identifier = data['resource[identifier]'] || this.object.identifier
    if(typeof identifier == 'undefined') return

    let id = this.sanitize_identifier(identifier)
    if(id != this.object.identifier && ResourcesList.all().includes(id)) return

    ResourcesList.add(id)

    window.pr.api.register_resource(id)
    window.pr.api.set(id, data['resource[default_value]'], { notify: true })
    window.pr.api.set(id.concat('_name'), data['resource[name]'])
    window.pr.api.set(id.concat('_visible'), data['resource[visible]'])
    window.pr.api.set(id.concat('_notify_chat'), data['resource[notify_chat]'])
    window.pr.api.set(id.concat('_notify_chat_message'), data['resource[notify_chat_message]'])
    window.pr.api.set(id.concat('_max'), data['resource[max_value]'])
    window.pr.api.set(id.concat('_min'), data['resource[min_value]'])
    window.pr.api.set(id.concat('_player_managed'), data['resource[player_managed]'])
  }

  sanitize_identifier(string) {
    return string
      .toLowerCase()
      .replace(/[0-9]+/, '')
      .replace(' ', '')
  }
}
