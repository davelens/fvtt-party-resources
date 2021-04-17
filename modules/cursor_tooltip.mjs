export default class CursorTooltip {
  static html() {
    if($('body').find('#cursor-tooltip').length == 0) {
      $('body').append($('<div id="cursor-tooltip"></div>'))
    }

    return $('#cursor-tooltip')
  }

  static hide() {
    $('#cursor-tooltip').remove()
  }

  static show(message) {
    let html = this.html()
    let position = {
      "left": event.pageX + 15,
      'top': event.pageY - 10,
      'z-index': 999,
    }
    html.text(message)
    html.offset(position)
    html.removeAttr('hidden')
    return html
  }
}
