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
    // NOTE: I used to do a remove+re-add of the entire bar, but I got reports
    // of it causing some layout thrashing. So this was expanded into something
    // that replaces HTML contents of a fresh render into the existing bar.

    const existing_bar = $('#fvtt-party-resources-status-bar')
    const refreshed_render = await foundry.applications.handlebars.renderTemplate(
      'modules/fvtt-party-resources/src/views/status_bar.html',
      this.getData()
    )
    const new_bar = $(refreshed_render)
    const location = ModuleSettings.get('status_bar_location')

    if(existing_bar.length) {
      // Element exists = Update its contents
      existing_bar.attr('class', new_bar.attr('class'))
      existing_bar.html(new_bar.html())
      this._placeInLocation(existing_bar, location)
    } else if(refreshed_render.trim().length) {
      // No pre-existent bar = Fresh render
      this._placeInLocation(new_bar, location)
      this._bindListeners()
    }
  }

  /**
   * Move the status bar to the correct parent if it isn't already there.
   */
  static _placeInLocation(bar_element, location) {
    const targets = {
      on_top:    { parent: $('header#ui-top'),    method: 'prepend', margin: '0' },
      at_bottom: { parent: $('footer#ui-bottom'), method: 'append',  margin: '30px' }
    }

    const target = targets[location]
    if(!target) return

    // Having the actors (or similar) directory listing open, will move the
    // message textarea to the left, right over the status bar. This moves
    // the notifications 30px upwards to prevent that.
    $('#chat-notifications').css('margin-bottom', target.margin)

    if(!target.parent.has(bar_element).length) {
      bar_element.detach()
      target.parent[target.method](bar_element)
    }
  }

  /**
   * Bind click listeners once using event delegation so they survive
   * innerHTML replacements during subsequent renders.
   */
  static _bindListeners() {
    const root = $('#fvtt-party-resources-status-bar')

    root.on('click', () => {
      window.pr.dashboard.render(true, {focus: true})
    })

    root.on('click', '.fvtt-party-resources-resource', event => {
      if(!game.user.isGM || (!event.ctrlKey && !event.metaKey))
        return

      event.stopImmediatePropagation()

      const id = $(event.currentTarget).data('id')
      if(!id) {
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
