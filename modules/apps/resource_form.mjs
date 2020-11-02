export default class ResourceForm extends FormApplication {
  /**
   * Default Application options
   *
   * @returns {Object}
   */
  static get defaultOptions() {
    console.log("%c"+ super.defaultOptions, 'color:green');
    return mergeObject(super.defaultOptions, {
      id: "forien-quest-log-form",
      template: "modules/forien-quest-log/templates/quest-form.html",
      title: game.i18n.localize("ForienQuestLog.QuestForm.Title"),
      width: 940,
      height: 640,
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
    console.log(options);
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
