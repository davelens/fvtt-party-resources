export default class ActorDnd5eResources {
  static icons = {
    'dnd_fifth_gold': 'icons/commodities/currency/coins-plain-stack-gold-yellow.webp',
    'dnd_fifth_item': null
  }

  static convert_dnd5e_currencies() {
    const player_characters = this.player_characters()
    if(player_characters.length == 0) return 0
    return player_characters
      .map((item) => { return this.convert_to_dnd5e_gold(item.system.currency) })
      .reduce((a,b) => { return a + b })
  }

  // Coin            CP        SP      EP      GP      PP
  // Copper (cp)     1         10      50      100     1,000
  // Silver (sp)     1/10      1       5       10      100
  // Electrum (ep)   1/50      1/5     1       2       20
  // Gold (gp)       1/100     1/10    1/2     1       10
  // Platinum (pp)   1/1,000   1/100   1/20    1/10    1
  static convert_to_dnd5e_gold(currency_object) {
    let total = 0.0
    total += currency_object.cp / 100.0
    total += currency_object.sp / 10.0
    total += currency_object.ep / 2.0
    total += currency_object.gp
    total += currency_object.pp * 10.0
    return total
  }

  static count(type, item_names) {
    switch(type) {
      case 'dnd_fifth_gold':
        return this.convert_dnd5e_currencies().toFixed(2)
      case 'dnd_fifth_item':
        // TODO: Might be an idea to access the dnd5e item pack through a
        // dropdown?
        //
        //   game.packs.get('dnd5e.items').index.forEach(item => {
        //     console.log(item)
        //   })
        //
        return this.count_player_items(item_names)
      default:
        return
    }
  }

  static count_player_items(names) {
    names = names.split(';').map((a) => { return a.trim() })
    const items = this.player_items(names)

    if(items.length == 0) return 0
    if(items.length == 1) return (items[0].system?.quantity || 1)

    return items
      .map(i => { return i?.system?.quantity || 0 })
      .reduce((a,b) => { return a + b })
  }

  static player_characters() {
    return game.actors.filter((actor) => { return actor.type == 'character' })
  }

  static player_items(names) {
    return this.player_characters().map(actor => {
      return actor.collections.items.filter(item => {
        return names.includes(item.name)
      })
    }).flat(2)
  }
}
