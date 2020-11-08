export default class ResourcesApi {
  static decrement(name) {
    let value = this.get(name) - 1
    this.set(name, value > 0 ? value : 0)
  }

  static increment(name) {
    let value = this.get(name)
    let max = this.get('max_'+ name)
    this.set(name, value >= max ? value : value + 1)
  }

  static get(name) {
    return parseInt(game.settings.get('fvtt-party-resources', name))
  }

  static register(name, options) {
    let properties = {
      scope: "world",
      config: false,
      type: String,
      default: 0,
      onChange: value => {
        if (PartyResourcesDashboard.rendered)
          PartyResourcesDashboard.render(true);
      }
    }

    game.settings.register('fvtt-party-resources', name, mergeObject(properties, options || {}))
  }

  static set(name, value, options) {
    game.settings.set('fvtt-party-resources', name, parseInt(value))
  }

  static resources() {
    // TODO: Make this dynamic once we have crud forms.
    return {
      inspiration: this.get('inspiration'),
      desperation: this.get('desperation'),
      influence_dice: this.get('influence_dice'),
      max_inspiration: this.get('max_inspiration'),
      max_desperation: this.get('max_desperation'),
      max_influence_dice: this.get('max_influence_dice')
    };
  }
}
