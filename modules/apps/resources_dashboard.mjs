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
      title: game.i18n.localize("FvttResourceTracker.Title"),
      tabs: [{navSelector: ".log-tabs", contentSelector: ".log-body", initial: "progress"}]
    });
  }

  getData() {
    return ResourcesApi.resources()
  }
}
