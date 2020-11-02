export default class ModuleSettings {
  static register() {
    let properties = {
      scope: "world",
      config: false,
      type: String,
      default: 0,
      onChange: value => { ResourceDashboard.render(true); }
    }

    game.settings.register('fvtt-party-resources', 'inspiration', properties)
    game.settings.register('fvtt-party-resources', 'desperation', properties)
    game.settings.register('fvtt-party-resources', 'influence_dice', properties)

    game.settings.register('fvtt-party-resources', 'max_inspiration', $.merge({
      default: 6
    }, properties))
    game.settings.register('fvtt-party-resources', 'max_desperation', $.merge({
      default: 6
    }, properties))
    game.settings.register('fvtt-party-resources', 'max_influence_dice', $.merge({
      default: 1
    }, properties))
  };
}
