import ResourcesList from "./../resources_list.mjs";

export default class ResourceForm extends FormApplication {
  activateListeners(html) {
    super.activateListeners(html)

    html.on('click', '#configure-permissions', event => {
      event.preventDefault()
      game.permissions.SETTINGS_MODIFY.push(1)
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
    return mergeObject({ id_disabled: false }, this.object)
  }

  /**
   * Called "on submit". Handles saving Form's data
   *
   * @param event
   * @param formData
   * @private
   */
  async _updateObject(event, data) {
    let id = this.sanitize_identifier(data['resource[identifier]'] || this.object.identifier)
    if(id != this.object.identifier && ResourcesList.all().includes(id)) return

    ResourcesList.add(id)

    window.pr.api.register(id)
    window.pr.api.register(id.concat('_name'))
    window.pr.api.register(id.concat('_visible'), { default: true })
    window.pr.api.register(id.concat('_max'))
    window.pr.api.register(id.concat('_min'))
    window.pr.api.register(id.concat('_player_managed'), { default: false })

    window.pr.api.set(id, data['resource[default_value]'])
    window.pr.api.set(id.concat('_name'), data['resource[name]'])
    window.pr.api.set(id.concat('_visible'), data['resource[visible]'])
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
