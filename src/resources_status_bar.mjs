export default class ResourcesStatusBar {
  static async render() {
    const template = 'modules/fvtt-party-resources/src/views/status_bar.html'
    const status_bar = await renderTemplate(template, window.pr.api.resources())

    $('header#ui-top').prepend(status_bar)
    $('footer#ui-bottom').append(status_bar)
  }
}
