import ModuleSettings from "./settings.mjs";
import ResourcesApi from "./resources_api.mjs";
import DashboardDirections from "./dashboard_directions.mjs";
import ResourceNotifications from "./resource_notifications.mjs"
import ResourcesDashboard from "./apps/resources_dashboard.mjs"
import ResourcesStatusBar from "./resources_status_bar.mjs";

Hooks.once('init', () => {
  window.pr = {
    version: game.modules.get('fvtt-party-resources').version,
    dashboard: new ResourcesDashboard(),
    api: new ResourcesApi(),
    notifications: new ResourceNotifications(),
    status_bar: ResourcesStatusBar
  }

  foundry.applications.handlebars.loadTemplates(templates())
  ModuleSettings.register()
})

Hooks.once('ready', () => {
  if(game.user.isGM && !window.pr.api.get('first-time-startup-notification-shown'))
    first_time_startup_notification()

  ResourcesStatusBar.render()
})

// Because system-specific totals need to be updated as currency or item totals
// get modified.
Hooks.on('createItem', render_resources)
Hooks.on('updateItem', render_resources)
Hooks.on('deleteItem', render_resources)
Hooks.on('updateActor', render_resources)
Hooks.on('deleteActor', render_resources)

Hooks.on('renderActorDirectory', async (app, html, data) => {
  if(!game.user.isGM && !ModuleSettings.get('toggle_actors_button_for_players'))
    return

  let button = await foundry.applications.handlebars.renderTemplate(
    'modules/fvtt-party-resources/src/views/dashboard_button.html'
  )

  $(html)
    .find('.directory-header')
    .prepend(button)
    .promise()
    .done(() => {
      $('#btn-dashboard').on('click', e => window.pr.dashboard.redraw(true))
    })
})

function first_time_startup_notification() {
  let message = game.i18n.format('FvttPartyResources.FirstTimeNotification', {
    anchor: '<a class="guide-me" href="#">Click here</a>',
    version: window.pr.version
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

function templates() {
  return [
    'modules/fvtt-party-resources/src/views/dashboard_button.html',
    'modules/fvtt-party-resources/src/views/status_bar.html'
  ]
}

function render_resources() {
  window.pr.dashboard.redraw()
  window.pr.status_bar.render()
}
