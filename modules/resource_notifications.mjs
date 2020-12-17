export default class ResourceNotifications {

  container() {
    return $('#fvtt-party-resources-notifications')
  }

  constructor() {
    this.notifications = []

    if ($('#fvtt-party-resources-notifications').length === 0) {
      $('body').append(`<div id="fvtt-party-resources-notifications"></div>`);
    }
  }

  queue(message) {
    this.notifications.push(message)
  }

  render() {
    this.notifications.forEach((message, index) => {
      this.container()
        .append('<div class="resource-notification">'+ message +'</div>')
        .find('.resource-notification').on('click', (e) => { this.clear(e) })
    })
  }

  clear(event) {
    this.fade($(event.currentTarget))

    if(this.container().find('.resource-notification').length > 0) {
      this.fade(this.container())
    }
  }

  fade(element) {
    if(element.length == 0) return
    element.fadeOut(200, element.empty)
  }
}
