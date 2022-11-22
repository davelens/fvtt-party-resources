export default class ModuleSettings {

  static add(key, data = {}) {
    const defaults = {
      scope: 'world',
      config: true
    }

    game.settings.register('fvtt-party-resources', key, Object.assign(defaults, data))
  }

  static get(key) {
    return game.settings.get('fvtt-party-resources', key)
  }

  static register() {
    window.pr.api.register_setting('resource_list')

    game.settings.register(
      'fvtt-party-resources',
      'first-time-startup-notification-shown',
      { scope: "client", config: false, type: Boolean, default: false }
    )

    this.add('toggle_actors_button_for_players', {
      name: game.i18n.localize('FvttPartyResources.GMSettingsForm.ShowActorsButtonForPlayers'),
      hint: game.i18n.localize('FvttPartyResources.GMSettingsForm.ShowActorsButtonForPlayersHint'),
      default: true,
      type: Boolean,
      onChange: value => ActorDirectory.collection.render('actors')
    });

    this.add('icon_images_orientation', {
      name: game.i18n.localize('FvttPartyResources.GMSettingsForm.IconImagesOrientation'),
      hint: game.i18n.localize('FvttPartyResources.GMSettingsForm.IconImagesOrientationHint'),
      default: 'on_top',
      type: String,
      isSelect: true,
      choices: {
        on_top: game.i18n.localize('FvttPartyResources.GMSettingsForm.IconImagesOrientationOnTop'),
        below: game.i18n.localize('FvttPartyResources.GMSettingsForm.IconImagesOrientationBelow')
      },
      onChange: value => window.pr.dashboard.redraw()
    });

    this.add('toggle_status_bar', {
      name: game.i18n.localize('FvttPartyResources.GMSettingsForm.ShowStatusBar'),
      hint: game.i18n.localize('FvttPartyResources.GMSettingsForm.ShowStatusBarHint'),
      default: true,
      type: Boolean,
      onChange: value => window.pr.status_bar.render()
    });

    this.add('status_bar_location', {
      name: game.i18n.localize('FvttPartyResources.GMSettingsForm.StatusBarLocation'),
      hint: game.i18n.localize('FvttPartyResources.GMSettingsForm.StatusBarLocationHint'),
      default: 'on_top',
      type: String,
      isSelect: true,
      choices: {
        on_top: game.i18n.localize('FvttPartyResources.GMSettingsForm.StatusBarLocationOnTop'),
        at_bottom: game.i18n.localize('FvttPartyResources.GMSettingsForm.StatusBarLocationAtBottom')
      },
      onChange: value => window.pr.status_bar.render()
    });

    // TODO: status_bar_size

  }
}
