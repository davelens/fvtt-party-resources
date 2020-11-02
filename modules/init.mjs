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
  let vars = {
    inspiration: CustomResourcesApi.get('inspiration'),
    desperation: CustomResourcesApi.get('desperation'),
    influence_dice: CustomResourcesApi.get('influence_dice'),
    max_inspiration: CustomResourcesApi.get('max_inspiration'),
    max_desperation: CustomResourcesApi.get('max_desperation'),
    max_influence_dice: CustomResourcesApi.get('max_influence_dice')
  };

  let template = 'modules/fvtt-resource-tracker/templates/resource_dashboard.html';
  renderTemplate(template, vars).then(dashboard_html => {
    let footer = html.find(".directory-footer");

    if (footer.length === 0) {
      footer = $(`<footer class="directory-footer"></footer>`);
      html.append(footer);
    }

    footer.append(dashboard_html).promise().done(function(){
      $('.resource-dashboard-btn').on('click', event => {
        event.stopPropagation();
        event.preventDefault();
        ResourceTracker.render(true);
      });
    });
  });
});
