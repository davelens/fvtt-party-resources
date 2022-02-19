export default class ResourceNotifications {
  container() {
    return $('#fvtt-party-resources-notifications')
  }

  html(message) {
    return $(`<div class="resource-notification">${message}<i class="fas fa-times close"></i></div>`)
  }

  constructor() {
    this.notifications = []

    if($('#fvtt-party-resources-notifications').length === 0) {
      $('body').append(`<div id="fvtt-party-resources-notifications"></div>`);
    }
  }

  queue(message) {
    let element = this.html(message)
    element.on('click', e => { this.clear(element) })
    this.notifications.push(element)
    return element
  }

  render() {
    this.notifications.forEach((notification, index) => {
      this.container().append(notification)
    })
  }

  clear(element) {
    this.fade(element)

    if(this.container().find('.resource-notification').length == 0) {
      this.fade(this.container())
    }
  }

  fade(element) {
    if(element.length == 0) return
    element.fadeOut(200, element.empty)
  }
}
