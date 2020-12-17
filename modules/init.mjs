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
  //if(!window.pr.api.get('first-time-startup-notification-shown'))
    first_time_startup_notification()
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

function first_time_startup_notification() {
  let message = game.i18n.format('FvttPartyResources.FirstTimeNotification', {
    anchor: '<a class="guide-me" href="#">Click here</a>',
    version: game.modules.get("fvtt-party-resources").data.version
  })

  let notification = window.pr.notifications.queue(message)
  notification.find('a.guide-me').on('click', e => {
    e.preventDefault()
    e.stopPropagation()
    DashboardDirections.render()
    setTimeout(() => { window.pr.notifications.clear(notification) }, 2000)
  })

  window.pr.notifications.render()
  window.pr.api.set('first-time-startup-notification-shown', true)
}
