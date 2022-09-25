export default class ActorResources {
  static reserved_ids = [
    'dnd_fifth_gold_standard'
  ]

  static count(type) {
    switch(type) {
      case 'dnd_fifth_gold_standard':
        return this.convert_dnd5e_currencies()
      default:
        return
    }
  }

  static convert_dnd5e_currencies() {
    return this.player_characters()
      .map((item) => { return item.system.currency })
      .reduce((a,b) => { return a.gp + b.gp })
  }

  static player_characters() {
    return game.actors.filter((item) => { return item.type == 'character' })
  }
}
