import ResourcesList from "./../resources_list.mjs";

export default class ResourceForm extends FormApplication {
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
      height: 322,
      width: 400,
      minimizable: false,
      closeOnSubmit: true
    });
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

    PartyResourcesApi.register(id)
    PartyResourcesApi.register(id.concat('_name'))
    PartyResourcesApi.register(id.concat('_visible'), { default: true })
    PartyResourcesApi.register(id.concat('_max'))

    PartyResourcesApi.set(id, data['resource[default_value]'])
    PartyResourcesApi.set(id.concat('_name'), data['resource[name]'])
    PartyResourcesApi.set(id.concat('_visible'), data['resource[visible]'])
    PartyResourcesApi.set(id.concat('_max'), data['resource[max_value]'])
  }

  sanitize_identifier(string) {
    return string
      .toLowerCase()
      .replace(/[0-9]+/, '')
      .replace(' ', '')
  }
};
