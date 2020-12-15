import ModuleSettings from "./settings.mjs";
import ResourcesApi from "./resources_api.mjs";
import CursorTooltip from "./cursor_tooltip.mjs";
import ResourcesDashboard from "./apps/resources_dashboard.mjs"

Hooks.once('init', () => {
  window.PartyResourcesDashboard = new ResourcesDashboard()
  window.PartyResourcesApi = new ResourcesApi()
  window.CursorTooltip = new CursorTooltip()
  ModuleSettings.register()
})

Hooks.on('renderActorDirectory', (app, html, data) => {
  html
    .find(".directory-header")
    .prepend('<div class="action-buttons flexrow"><button id="btn-dashboard"><i class="fas fa-calculator"> </i> Party Resources</div>')
    .promise()
    .done(() => {
      $('#btn-dashboard').on('click', e => PartyResourcesDashboard.redraw(true))
    })
})
