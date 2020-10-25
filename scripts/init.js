console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
	let properties = { scope: "client", config: false, default: 0 }
	game.settings.register('party-inspiration', 'inspiration', properties);
	game.settings.register('party-inspiration', 'desperation', properties);
  // TODO: Create Firebase document?
});

Hooks.on("ready", function() {
});

Hooks.on("renderActorDirectory", (app, html, data) => {
  const button = $(`<button class="inspiration-btn"><i class="fas fa-lightbulb"></i> ${game.i18n.localize("PartyInspiration.InspirationButton")}</button>`);

  let footer = html.find(".directory-footer");
  if (footer.length === 0) {
    footer = $(`<footer class="directory-footer"><div class="footer-actions action-buttons flexrow"></div></footer>`);
    html.append(footer);
  }
  footer.append(button);

  button.click(ev => {
    // TODO: render a modal with information.
		alert(`Inspiration total: ${game.settings.get('party-inspiration', 'inspiration')}`);
  });
});
