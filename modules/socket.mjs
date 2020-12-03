export default class Socket {
  static refresh_dashboard(force) {
    PartyResourcesDashboard.render(force || false)
    setTimeout(PartyResourcesDashboard.recalculate_height, 5)

    game.socket.emit('module.fvtt-party-resources', {
      type: "refresh_dashboard",
      force: force || false
    })
  }

  static listen() {
    game.socket.on('module.fvtt-party-resources', data => {
      if(data.type == 'refresh_dashboard') {
        PartyResourcesDashboard.render(data.force)
        setTimeout(PartyResourcesDashboard.recalculate_height, 5)
      }
    })
  }
}
