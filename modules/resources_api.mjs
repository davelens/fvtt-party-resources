export default class ResourcesApi {
  static get(name) {
    return game.settings.get('fvtt-party-resources', name)
  }

  static set(name, value, options) {
    let properties = $.merge(
      options,
      { scope: "client", config: false, default: 0 },
    )

    game.settings.register('fvtt-party-resources', name, properties);
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
