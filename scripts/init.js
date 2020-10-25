console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  // TODO: Create Firebase document?
});

Hooks.on("ready", function() {
});

Hooks.on("renderActorDirectory", (app, html, data) => {
  const button = $(`<button class="inspiration-btn">${game.i18n.localize("PartyInspiration.InspirationButton")}</button>`);

  let header = html.find(".directory-header");
  if (header.length === 0) {
    header = $(`<header class="directory-header"><div class="header-actions action-buttons flexrow"></div></header>`);
    html.append(header);
  }
  header.find('.header-actions.action-buttons').append(button);

  button.click(ev => {
    // TODO: render a modal with information.
  });
});
