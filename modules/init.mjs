import ModuleSettings from "./settings.mjs";
import ResourcesApi from "./resources_api.mjs";
import CursorTooltip from "./cursor_tooltip.mjs";
import DashboardDirections from "./dashboard_directions.mjs";
import ResourcesDashboard from "./apps/resources_dashboard.mjs"

Hooks.once('init', () => {
  window.pr = {
    dashboard: new ResourcesDashboard(),
    api: new ResourcesApi(),
    cursor_tooltip: new CursorTooltip(),
    notification: new ResourcesNotification(),
  }

  ModuleSettings.register()
})

Hooks.once('ready', () => {
})

Hooks.on('renderActorDirectory', (app, html, data) => {
  html
    .find(".directory-header")
    .prepend('<div class="action-buttons flexrow"><button id="btn-dashboard"><i class="fas fa-calculator"> </i> Party Resources</div>')
    .promise()
    .done(() => {
      $('#btn-dashboard').on('click', e => window.pr.dashboard.redraw(true))
    })
})
