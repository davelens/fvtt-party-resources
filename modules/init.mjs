import ModuleSettings from "./settings.mjs";
import CustomResourcesApi from "./api.mjs";
import CustomResourcesDashboard from "./dashboard.mjs";

Hooks.once('init', () => {
  ModuleSettings.register()
})

Hooks.on("renderActorDirectory", (app, html, data) => {
  let template = Handlebars.compile(CustomResourcesDashboard.template());
  let dashboard_html = template({
    inspiration: CustomResourcesApi.get('inspiration'),
    desperation: CustomResourcesApi.get('desperation'),
    influence_dice: CustomResourcesApi.get('influence_dice'),
    max_inspiration: CustomResourcesApi.get('max_inspiration'),
    max_desperation: CustomResourcesApi.get('max_desperation'),
    max_influence_dice: CustomResourcesApi.get('max_influence_dice')
  });

  let footer = html.find(".directory-footer");
  if (footer.length === 0) {
    footer = $(`<footer class="directory-footer"></footer>`);
    html.append(footer);
  }

  footer.append(dashboard_html);
});
