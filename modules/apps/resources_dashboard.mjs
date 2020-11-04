import ResourcesApi from "./../resources_api.mjs";

export default class ResourcesDashboard extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-party-resources",
      classes: ["fvtt-party-resources"],
      template: "modules/fvtt-party-resources/templates/resources_dashboard.html",
      minimizable: true,
      title: game.i18n.localize("FvttPartyResources.Title")
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.on('click', '.change-value.add', event => {
      event.stopPropagation()
      event.preventDefault()
      let anchor = $(event.currentTarget)
      let setting = anchor.data('setting')
      ResourcesApi.increment(setting)
    })

    html.on('click', '.change-value.subtract', event => {
      event.stopPropagation()
      event.preventDefault()
      let anchor = $(event.currentTarget)
      let setting = anchor.data('setting')
      ResourcesApi.decrement(setting)
    })
  }

  getData() {
    return mergeObject(ResourcesApi.resources(), { is_gm: game.user.isGM })
  }
}
