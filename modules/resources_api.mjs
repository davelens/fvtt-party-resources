export default class ResourcesApi {
  static decrement(name) {
    let value = ResourcesApi.get(name) - 1
    ResourcesApi.set(name, value > 0 ? value : 0)
  }

  static increment(name) {
    ResourcesApi.set(name, ResourcesApi.get(name) + 1)
  }

  static get(name) {
    return parseInt(game.settings.get('fvtt-party-resources', name))
  }

  static set(name, value, options) {
    game.settings.set('fvtt-party-resources', name, parseInt(value))
  }

  static resources() {
    // TODO: Make this dynamic once we have crud forms.
    return {
      inspiration: ResourcesApi.get('inspiration'),
      desperation: ResourcesApi.get('desperation'),
      influence_dice: ResourcesApi.get('influence_dice'),
      max_inspiration: ResourcesApi.get('max_inspiration'),
      max_desperation: ResourcesApi.get('max_desperation'),
      max_influence_dice: ResourcesApi.get('max_influence_dice')
    };
  }
}
