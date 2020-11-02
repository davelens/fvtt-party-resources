import ModuleSettings from "./settings.mjs";
import CustomResourcesApi from "./api.mjs";
import ResourceDashboard from "./apps/resource_dashboard.mjs"

Hooks.once('init', () => {
  ModuleSettings.register()
});

Hooks.once('setup', () => {
  window.ResourceTracker = new ResourceDashboard();
});

Hooks.on("renderActorDirectory", (app, html, data) => {
  html.find(".directory-header")
    .prepend('<div class="action-buttons flexrow"><button class="resource-dashboard-btn"><i class="fas fa-calculator"> </i> Party Resources</div>')
    .promise()
    .done(function(){
      $('.resource-dashboard-btn').on('click', event => {
        ResourceTracker.render(true);
      });
    });
});
