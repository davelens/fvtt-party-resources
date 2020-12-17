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
}
