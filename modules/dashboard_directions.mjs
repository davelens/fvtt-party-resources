export default class DashboardDirections {
  static container_html() {
    return $('<div id="fvtt-party-resources-directions">&rarr;</div>')
  }

  static render() {
    if($('body').find('#fvtt-party-resources-directions').length == 0) {
      $('body').append(this.container_html())
    }

    $('[data-tab="actors"].item')[0].click()
    $('#btn-dashboard').addClass('highlight')
    return $('#fvtt-party-resources-directions')
  }

  static remove() {
    $('#btn-dashboard').removeClass('highlight')
    $('#fvtt-party-resources-directions').remove()
  }

  static notify() {
    let anchor = '<a id="fvtt-party-resources-guide-me" href="#">Click here</a>'
    let message = game.i18n.format('FvttPartyResources.FirstTimeNotification', { anchor: anchor })
    let notification = new Notifications()
    notification.notify(message, 'info', true)
    notification.render()
    return notification
  }

  static bind_clicks(notification) {
    $('#fvtt-party-resources-guide-me').on('click', e => {
      e.preventDefault()
      e.stopPropagation()
      notification.close()
      this.render()
    })
  }
}
