Hooks.on("init", function() {
  let properties = { scope: "client", config: false, default: 0 }
  game.settings.register('party-resources', 'inspiration', properties);
  game.settings.register('party-resources', 'desperation', properties);
  game.settings.register('party-resources', 'influence-dice', properties);
});

Hooks.on("renderActorDirectory", (app, html, data) => {
  let template = Handlebars.compile(dashboard_template);
  let dashboard_html = template({
    inspiration: game.settings.get('party-resources', 'inspiration'),
    desperation: game.settings.get('party-resources', 'desperation'),
    influence_dice: game.settings.get('party-resources', 'influence-dice')
  });

  let footer = html.find(".directory-footer");
  if (footer.length === 0) {
    footer = $(`<footer class="directory-footer"></footer>`);
    html.append(footer);
  }

  footer.append(dashboard_html);
});
