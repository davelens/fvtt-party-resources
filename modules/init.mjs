import ModuleSettings from "./settings.mjs";
import ResourcesApi from "./resources_api.mjs";
import ResourcesDashboard from "./apps/resources_dashboard.mjs"

Hooks.once('init', () => {
  window.PartyResourcesDashboard = new ResourcesDashboard()
  window.PartyResourcesApi = new ResourcesApi()
  ModuleSettings.register()
})

<<<<<<< Updated upstream
Hooks.once('ready', () => {
  Socket.listen();
})

Hooks.on("renderActorDirectory", (app, html, data) => {
=======
Hooks.on('renderActorDirectory', (app, html, data) => {
>>>>>>> Stashed changes
  html
    .find(".directory-header")
    .prepend('<div class="action-buttons flexrow"><button id="btn-dashboard"><i class="fas fa-calculator"> </i> Party Resources</div>')
    .promise()
<<<<<<< Updated upstream
    .done(() => $('#btn-dashboard').on('click', e => Socket.refresh_dashboard(true)))
=======
    .done(() => {
      $('#btn-dashboard').on('click', e => PartyResourcesDashboard.redraw(true))
    })
>>>>>>> Stashed changes
})
