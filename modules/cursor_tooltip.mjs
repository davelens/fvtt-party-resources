export default class CursorTooltip {
  container = $('<div id="cursor-tooltip"></div>')

  html() {
    if($('body').find('#cursor-tooltip').length == 0) {
      $('body').append(this.container)
    }

    return $('#cursor-tooltip')
  }

  hide() {
    $('#cursor-tooltip').remove()
  }

  show(message) {
    let position = {
      "left": event.pageX + 15,
      'top': event.pageY - 10,
      'z-index': 999,
    }
    this.html().text(message)
    this.html().offset(position)
    this.html().removeAttr('hidden')
    return this.html()
  }
}
