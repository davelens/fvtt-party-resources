export default class ResourceForm extends FormApplication {
  /**
   * Default Application options
   *
   * @returns {Object}
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-party-resources",
      template: "modules/fvtt-party-resources/templates/resource_form.html",
      title: game.i18n.localize("FvttPartyResources.Title"),
      height: 232,
      closeOnSubmit: true
    });
  }

  /**
   * Retrieves Data to be used in rendering template.
   *
   * @param options
   * @returns {Promise<Object>}
   */
  async getData(options = {}) {
    return {};
  }

  /**
   * Called "on submit". Handles saving Form's data
   *
   * @param event
   * @param formData
   * @private
   */
  async _updateObject(event, formData) {
    console.log(formData);
  }

  async close() {
  }

  /**
   * Fired whenever any of TinyMCE editors is saved.
   * Just pass data to object's property, we handle save in one go after submit
   *
   * @see _updateObject()
   *
   * @param target
   * @param element
   * @param content
   * @returns {Promise<void>}
   * @private
   */
  async _onEditorSave(target, element, content) {
    this[target] = content;

    // keep function to override parent function
    // we don't need to submit form on editor save
  }
};
