import ResourceForm from "./resource_form.mjs";

export default class ResourceDashboard extends Application {
  /**
   * Default Application options
   *
   * @returns {Object}
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-resource-tracker",
      classes: ["fvtt-resource-tracker"],
      template: "modules/fvtt-resource-tracker/templates/resource_form.html",
      width: 700,
      height: 480,
      minimizable: true,
      resizable: true,
      title: game.i18n.localize("FvttResourceTracker.Title"),
      tabs: [{navSelector: ".log-tabs", contentSelector: ".log-body", initial: "progress"}]
    });
  }

  /**
   * Defines all event listeners like click, drag, drop etc.
   *
   * @param html
   */
  activateListeners(html) {
    super.activateListeners(html);

    html.on("click", ".resource-dashboard-btn", () => {
      new ResourceForm({}).render(true);
    });
  }
}
