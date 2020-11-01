export default class CustomResourcesApi {
  static get(name) {
    return game.settings.get('fvtt-resource-tracker', name)
  }

  static set(name, value, options) {
    let properties = $.merge(
      options,
      { scope: "client", config: false, default: 0 },
    )

    game.settings.register('fvtt-resource-tracker', name, properties);
  }
}
