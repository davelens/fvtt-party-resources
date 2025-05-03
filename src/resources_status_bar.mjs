import ModuleSettings from './settings.mjs';
import ResourceForm from './apps/resource_form.mjs'

export default class ResourcesStatusBar {
  static getData() {
    return {
      ...window.pr.api.resources(),
      ...{
        is_gm: game.user.isGM,
        status_bar: ModuleSettings.get('toggle_status_bar'),
        status_bar_full_width: ModuleSettings.get('toggle_status_bar_full_width'),
        status_bar_classes: this.classes()
      }
    }
  }

  static classes() {
    return [
      (ModuleSettings.get('status_bar_align') ? ModuleSettings.get('status_bar_align') : 'align-center'),
      (ModuleSettings.get('toggle_status_bar_full_width') ? 'full-width' : ''),
    ].join(' ')
  }

  static async render() {
    const data = this.getData()

    const template = 'modules/fvtt-party-resources/src/views/status_bar.html'
    const status_bar = await foundry.applications.handlebars.renderTemplate(template, data)

    $('#fvtt-party-resources-status-bar').remove()

    if(ModuleSettings.get('status_bar_location') == 'on_top') {
      $('#chat-notifications').css('margin-bottom', '0')
      $('header#ui-top').prepend(status_bar)
    }

    if(ModuleSettings.get('status_bar_location') == 'at_bottom') {
      // Having the actors (or similar) directory listing open, will move the
      // message textarea to the left, right over the status bar. This moves
      // the notifications 30px upwards to prevent that.
      $('#chat-notifications').css('margin-bottom', '30px')
      $('footer#ui-bottom').append(status_bar)
    }

    $('#fvtt-party-resources-status-bar').click(() => {
      window.pr.dashboard.render(true, {focus: true})
    })

    $('.fvtt-party-resources-resource').on('click', event => {
      if (!game.user.isGM || (!event.ctrlKey && !event.metaKey)) {
        return
      }

      event.stopPropagation()

      const id = $(event.target).data('id')

      if (!id) {
        console.error('Party Resources: Clicked resource does not have an ID!')
        return
      }

      const resource = window.pr.dashboard.resource_data(id)

      new ResourceForm(
        resource,
        {
          id: 'edit-resource-form',
          title: game.i18n.localize('FvttPartyResources.ResourceForm.EditFormTitle')
        }
      ).render(true, {focus: true})
    })
  }
}
