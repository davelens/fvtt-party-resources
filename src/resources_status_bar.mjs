export default class ResourcesStatusBar {
  static async render() {
    const template = 'modules/fvtt-party-resources/src/views/status_bar.html'

    let resources = {
      skills: [
        { id: 'silver-bars', name: 'Silver bars', value: '18', icon: 'systems/dnd5e/icons/items/inventory/bar-silver.jpg' },
        { id: 'gold-bars', name: 'Gold bars', value: '9', icon: 'systems/dnd5e/icons/items/inventory/bar-gold.jpg' }
      ]
    }

    let status_bar = await renderTemplate(template, resources)

    $('header#ui-top').prepend(status_bar)
    $('footer#ui-bottom').append(status_bar)
  }
}
