import ResourcesList from "./../resources_list.mjs";
import ActorDnd5eResources from "./../actor_dnd5e_resources.mjs";

export default class ResourceForm extends FormApplication {
  activateListeners(html) {
    super.activateListeners(html)

    html.on('change', '#notify_chat', event => {
      $('#notify_chat_increment_message')
        .prop('disabled', !$(event.target).prop('checked'))

      $('#notify_chat_decrement_message')
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

    html.on('keyup', '#name, #identifier', event => {
      let value = $(event.currentTarget).val()
      if(this.id == 'edit-resource-form') return

      // This makes sure the identifier field does not differ from the
      // selection made in the dnd5e_name dropdown.
      if($('#dnd5e_name').val() != '')
        value = $('#dnd5e_name').val()

      $('#identifier').val(this.sanitize_identifier(value))
    })

    // Selecting a 5e specific resource will prefil the identifier input
    // with a specific value.
    html.on('change', '#dnd5e_name', event => {
      let identifier_input = $('#identifier')
      let selection = event.currentTarget.value
      identifier_input.val(selection)
      $('#use_icon').prop('checked', true)
      $('[name="resource[icon]"]').val(ActorDnd5eResources.reserved_ids[selection].icon)
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
      template: "modules/fvtt-party-resources/src/views/resource_form.html",
      width: 600,
      minimizable: false,
      closeOnSubmit: true
    })
  }

  getData(object) {
    let defaults = {
      id_disabled: false,
      enable_dnd5e_input: this.id == 'add-resource-form' && game.system.id == 'dnd5e',
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
    window.pr.api.set(id.concat('_notify_chat'), data['resource[notify_chat]'])
    window.pr.api.set(id.concat('_notify_chat_increment_message'), data['resource[notify_chat_increment_message]'])
    window.pr.api.set(id.concat('_notify_chat_decrement_message'), data['resource[notify_chat_decrement_message]'])
    window.pr.api.set(id.concat('_max'), data['resource[max_value]'])
    window.pr.api.set(id.concat('_min'), data['resource[min_value]'])
    window.pr.api.set(id.concat('_player_managed'), data['resource[player_managed]'])
    window.pr.api.set(id.concat('_use_icon'), data['resource[use_icon]'])
    window.pr.api.set(id.concat('_icon'), data['resource[icon]'])
  }

  sanitize_identifier(string) {
    return string
      .toLowerCase()
      .replace(/[0-9]+/g, '')
      .replace(/[^\w ]|\s+/g, '-')
  }
}
