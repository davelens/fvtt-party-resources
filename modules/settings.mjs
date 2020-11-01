export default class ModuleSettings {
  static register() {
    let properties = {
      scope: "world",
      config: false,
      type: String,
      default: 0,
      onChange: value => { game.actors.render() }
    }

    game.settings.register('fvtt-resource-tracker', 'inspiration', properties)
    game.settings.register('fvtt-resource-tracker', 'desperation', properties)
    game.settings.register('fvtt-resource-tracker', 'influence_dice', properties)

    game.settings.register('fvtt-resource-tracker', 'max_inspiration', $.merge({
      default: 6
    }, properties))
    game.settings.register('fvtt-resource-tracker', 'max_desperation', $.merge({
      default: 6
    }, properties))
    game.settings.register('fvtt-resource-tracker', 'max_influence_dice', $.merge({
      default: 1
    }, properties))
  };
}
