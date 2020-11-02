import PartyResourcesApi from "./../api.mjs";
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
      template: "modules/fvtt-resource-tracker/templates/resource_dashboard.html",
      minimizable: true,
      title: game.i18n.localize("FvttResourceTracker.Title"),
      tabs: [{navSelector: ".log-tabs", contentSelector: ".log-body", initial: "progress"}]
    });
  }

  getData() {
    return {
      inspiration: PartyResourcesApi.get('inspiration'),
      desperation: PartyResourcesApi.get('desperation'),
      influence_dice: PartyResourcesApi.get('influence_dice'),
      max_inspiration: PartyResourcesApi.get('max_inspiration'),
      max_desperation: PartyResourcesApi.get('max_desperation'),
      max_influence_dice: PartyResourcesApi.get('max_influence_dice')
    };
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
