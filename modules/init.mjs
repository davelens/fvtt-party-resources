import ModuleSettings from "./settings.mjs";
import ResourcesApi from "./resources_api.mjs";
import ResourcesDashboard from "./apps/resources_dashboard.mjs"

Hooks.once('init', () => {
  ModuleSettings.register()
});

Hooks.once('setup', () => {
  window.PartyResourcesDashboard = new ResourcesDashboard();
});

Hooks.on("renderActorDirectory", (app, html, data) => {
  html.find(".directory-header")
    .prepend('<div class="action-buttons flexrow"><button class="resource-dashboard-btn"><i class="fas fa-calculator"> </i> Party Resources</div>')
    .promise()
    .done(function(){
      $('.resource-dashboard-btn').on('click', event => {
        PartyResourcesDashboard.render(true);
      });
    });
});
