import ResourcesApi from "./../resources_api.mjs";

export default class ResourcesDashboard extends Application {
  /**
   * Default Application options
   *
   * @returns {Object}
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-party-resources",
      classes: ["fvtt-party-resources"],
      template: "modules/fvtt-party-resources/templates/resources_dashboard.html",
      minimizable: true,
      title: game.i18n.localize("FvttPartyResources.Title")
    });
  }

  getData() {
    return mergeObject(ResourcesApi.resources(), { is_gm: game.user.isGM })
  }
}
