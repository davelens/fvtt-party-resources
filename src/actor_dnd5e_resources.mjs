export default class ActorDnd5eResources {
  static reserved_ids = {
    'dnd_fifth_gold_standard': {
      icon: 'icons/commodities/currency/coins-plain-stack-gold-yellow.webp'
    },
    'dnd_fifth_rations': {
      icon: 'icons/consumables/meat/hock-leg-pink-brown.webp'
    }
  }

  static count(type) {
    switch(type) {
      case 'dnd_fifth_gold_standard':
        return this.convert_dnd5e_currencies().toFixed(2)
      case 'dnd_fifth_rations':
        const rations = this.count_rations()
        return rations < 0 ? 0 : rations
      default:
        return
    }
  }

  static convert_dnd5e_currencies() {
    const player_characters = this.player_characters()
    if(player_characters.length == 0) return 0
    return player_characters
      .map((item) => { return this.convert_to_dnd5e_gold(item.system.currency) })
      .reduce((a,b) => { return a + b })
  }

  //Coin            CP        SP      EP      GP      PP
  //Copper (cp)     1         10      50      100     1,000
  //Silver (sp)     1/10      1       5       10      100
  //Electrum (ep)   1/50      1/5     1       2       20
  //Gold (gp)       1/100     1/10    1/2     1       10
  //Platinum (pp)   1/1,000   1/100   1/20    1/10    1
  static convert_to_dnd5e_gold(currency_object) {
    let total = 0.0
    total += currency_object.cp / 100.0
    total += currency_object.sp / 10.0
    total += currency_object.ep / 2.0
    total += currency_object.gp
    total += currency_object.pp * 10.0
    return total
  }

  static count_rations() {
    const rations = this.rations()
    if(rations.length == 0) return 0
    if(rations.length == 1) return rations[0].system.quantity

    return rations.reduce((a,b) => {
      return (a?.system?.quantity || 0) + (b?.system?.quantity || 0)
    })
  }

  static included(id) {
    return Object.keys(this.reserved_ids).includes(id)
  }

  static player_characters() {
    return game.actors.filter((actor) => { return actor.type == 'character' })
  }

  static rations() {
    return this.player_characters().map(actor => {
      return actor.collections.items.filter(item => {
        return item.name == 'Rations'
      })
    }).flat(2)
  }
}
