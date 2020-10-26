export default class ModuleSettings {
  static register() {
    let properties = {
      scope: "world",
      config: false,
      type: Number,
      default: 0,
      onChange: value => { game.actors.render() }
    }

    game.settings.register('party-resources', 'inspiration', properties)
    game.settings.register('party-resources', 'desperation', properties)
    game.settings.register('party-resources', 'influence_dice', properties)

    game.settings.register('party-resources', 'max_inspiration', $.merge({
      default: 6
    }, properties))
    game.settings.register('party-resources', 'max_desperation', $.merge({
      default: 6
    }, properties))
    game.settings.register('party-resources', 'max_influence_dice', $.merge({
      default: 1
    }, properties))
  };
}
