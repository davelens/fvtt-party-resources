import ResourcesApi from "./../resources_api.mjs";
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

    ResourcesApi.register(id)
    ResourcesApi.register(id.concat('_name'))
    ResourcesApi.register(id.concat('_visible'), { default: true })
    ResourcesApi.register(id.concat('_max'))

    ResourcesApi.set(id, data['resource[default_value]'])
    ResourcesApi.set(id.concat('_name'), data['resource[name]'])
    ResourcesApi.set(id.concat('_visible'), data['resource[visible]'])
    ResourcesApi.set(id.concat('_max'), data['resource[max_value]'])
  }
};
