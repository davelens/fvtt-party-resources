import ModuleSettings from "./settings.mjs";
import ResourcesApi from "./resources_api.mjs";
import CursorTooltip from "./cursor_tooltip.mjs";
import DashboardDirections from "./dashboard_directions.mjs";
import ResourceNotifications from "./resource_notifications.mjs"
import ResourcesDashboard from "./apps/resources_dashboard.mjs"

Hooks.once('init', () => {
  window.pr = {
    dashboard: new ResourcesDashboard(),
    api: new ResourcesApi(),
    cursor_tooltip: new CursorTooltip(),
    notifications: new ResourceNotifications(),
  }

  ModuleSettings.register()
})

Hooks.once('ready', () => {
  let anchor = '<a id="fvtt-party-resources-guide-me" href="#">Click here</a>'
  let message = game.i18n.format('FvttPartyResources.FirstTimeNotification', { anchor: anchor })
  window.pr.notifications.queue(message)
  window.pr.notifications.render()
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
