import ModuleSettings from "./settings.mjs";

export default class ResourcesStatusBar {
  static getData() {
    return {
      ...window.pr.api.resources(),
      ...{
        is_gm: game.user.isGM,
        status_bar: ModuleSettings.get('toggle_status_bar')
      }
    }
  }

  static async render() {
    const template = 'modules/fvtt-party-resources/src/views/status_bar.html'
    const status_bar = await renderTemplate(template, this.getData())

    if(ModuleSettings.get('status_bar_location') == 'on_top')
      $('header#ui-top').prepend(status_bar)

    if(ModuleSettings.get('status_bar_location') == 'at_bottom')
      $('footer#ui-bottom').append(status_bar)
  }
}
