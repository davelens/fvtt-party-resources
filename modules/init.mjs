import ModuleSettings from "./settings.mjs";
import PartyResourcesApi from "./api.mjs";
import ResourcesDashboard from "./dashboard.mjs";

Hooks.once('init', () => {
  ModuleSettings.register()
})

Hooks.on("renderActorDirectory", (app, html, data) => {
  let template = Handlebars.compile(ResourcesDashboard.template());
  let dashboard_html = template({
    inspiration: PartyResourcesApi.get('inspiration'),
    desperation: PartyResourcesApi.get('desperation'),
    influence_dice: PartyResourcesApi.get('influence_dice'),
    max_inspiration: PartyResourcesApi.get('max_inspiration'),
    max_desperation: PartyResourcesApi.get('max_desperation'),
    max_influence_dice: PartyResourcesApi.get('max_influence_dice')
  });

  let footer = html.find(".directory-footer");
  if (footer.length === 0) {
    footer = $(`<footer class="directory-footer"></footer>`);
    html.append(footer);
  }

  footer.append(dashboard_html);
});
