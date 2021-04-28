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

    this.add('toggle-actors-button-for-players', {
      name: game.i18n.localize('FvttPartyResources.GMSettingsForm.ShowActorsButtonForPlayers'),
      hint: game.i18n.localize('FvttPartyResources.GMSettingsForm.ShowActorsButtonForPlayersHint'),
      default: true,
      type: Boolean,
      onChange: value => ActorDirectory.collection.render('actors')
    });
  }
}
