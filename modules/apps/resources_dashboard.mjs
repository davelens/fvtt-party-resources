import ResourcesList from "./../resources_list.mjs";
import ResourceForm from "./resource_form.mjs";

export default class ResourcesDashboard extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-party-resources-dashboard",
      classes: ["fvtt-party-resources"],
      template: "modules/fvtt-party-resources/templates/resources_dashboard.html",
      minimizable: true,
      resizable: true,
      title: game.i18n.localize("FvttPartyResources.Title")
    })
  }

  activateListeners(html) {
    super.activateListeners(html)

    html.on('click', '.change-value', e => {
      this.setup_calculation(e, (setting, jump) => {
        if($(e.currentTarget).hasClass('add')) {
          PartyResourcesApi.increment(setting, jump)
        } else {
          PartyResourcesApi.decrement(setting, jump)
        }
      })
    })

    html.on('mousemove', '.change-value', e => {
      let jump = this.increment_jump(e)
      if(jump == 1) return
      let operation = $(e.currentTarget).hasClass('add') ? '+' : '-'
      CursorTooltip.show(operation.concat(new String(jump)))
    })

    html.on('mouseout', '.change-value', e => {
      CursorTooltip.hide()
    })

    html.on('click', '.delete', e => {
      this.setup_calculation(e, setting => { ResourcesList.remove(setting) })
    })

    html.on('click', '.invisible, .visible', e => {
      this.setup_calculation(e, setting => { this.toggle_visiblity(setting) })
    })

    html.on('click', '.new-resource-form-btn', e => {
      new ResourceForm(
        {},
        {
          id: "add-resource-form",
          title: game.i18n.localize("FvttPartyResources.ResourceForm.AddFormTitle")
        }
      ).render(true)
    })

    html.on('click', '.edit', e => {
      e.stopPropagation()
      e.preventDefault()

      new ResourceForm(
        this.resource_data($(e.currentTarget).data('setting')),
        {
          id: "edit-resource-form",
          title: game.i18n.localize("FvttPartyResources.ResourceForm.EditFormTitle")
        }
      ).render(true)
    })
  }

  increment_jump(event) {
    if(event.ctrlKey || event.metaKey) return 10
    if(event.shiftKey) return 100
    return 1
  }

  getData() {
    return mergeObject(PartyResourcesApi.resources(), { is_gm: game.user.isGM })
  }

  setup_calculation(event, process) {
    event.stopPropagation()
    event.preventDefault()
    process(
      $(event.currentTarget).data('setting'),
      this.increment_jump(event)
    )
  }

  toggle_visiblity(setting) {
    PartyResourcesApi.set(
      setting.concat('_visible'),
      !PartyResourcesApi.get(setting.concat('_visible'))
    )
  }

  // Deprecated and no longer in use since v1.1
  // Leaving it here as a means to a "reset window size" button or something.
  recalculate_height() {
    $('#fvtt-party-resources-dashboard').css({
      width: 'auto',
      height: 'auto'
    })
  }

  redraw(force) {
    this.render(force)
  }

  resource_data(id) {
    return {
      identifier: id,
      default_value: PartyResourcesApi.get(id),
      name: PartyResourcesApi.get(id.concat('_name')),
      max_value: PartyResourcesApi.get(id.concat('_max')),
      min_value: PartyResourcesApi.get(id.concat('_min')),
      player_managed: PartyResourcesApi.get(id.concat('_player_managed')),
      allowed_to_modify_settings: game.permissions.SETTINGS_MODIFY.includes(1),
      visible: PartyResourcesApi.get(id.concat('_visible'))
    }
  }

}
