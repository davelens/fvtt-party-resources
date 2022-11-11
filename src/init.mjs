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

  loadTemplates(templates())
  ModuleSettings.register()
})

Hooks.once('ready', () => {
  if(game.user.isGM && !window.pr.api.get('first-time-startup-notification-shown'))
    first_time_startup_notification()

  ResourcesStatusBar.render()
})

// Because currency totals need to be updated once an actor leaves the game.
Hooks.on('deleteActor', async () => {
  window.pr.dashboard.redraw()
  window.pr.status_bar.render()
})


// So it's important to remember that this is a system-agnostic module, and
// currency may be present in dnd5e, but not in other game systems.
// Regardless, this can be extended with support for currency-related changes
// from other systems.
Hooks.on('createItem', item_change_listener)
Hooks.on('updateItem', item_change_listener)
Hooks.on('deleteItem', item_change_listener)
Hooks.on('updateActor', actor_change_listener)

Hooks.on('renderActorDirectory', async (app, html, data) => {
  if(!game.user.isGM && !ModuleSettings.get('toggle_actors_button_for_players'))
    return

  let button = await renderTemplate(
    'modules/fvtt-party-resources/src/views/dashboard_button.html'
  )

  html
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

async function item_change_listener(item, change, options, userId) {
  if(item.type == 'consumable' && item.name == 'Rations')
    render_resources()
}

async function actor_change_listener(actor, change, options, userId) {
  // So it's important to remember that this is a system-agnostic module, and
  // currency may be present in dnd5e, but not in other game systems.
  // Regardless, this can be extended with support for currency-related changes
  // from other systems.
  if(change?.system?.currency)
    render_resources()
}

function render_resources() {
  window.pr.dashboard.redraw()
  window.pr.status_bar.render()
}
