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
      title: game.i18n.localize("FvttPartyResources.Title"),
      height: 232,
      width: 400,
      closeOnSubmit: true
    });
  }

  /**
   * Called "on submit". Handles saving Form's data
   *
   * @param event
   * @param formData
   * @private
   */
  async _updateObject(event, data) {
    let id = data['resource[identifier]']
    if(ResourcesList.all().includes(id)) return;

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
};
