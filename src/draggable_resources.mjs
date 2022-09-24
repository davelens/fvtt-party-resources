export default class DraggableResources {
  app = null
  current_source_id = null
  current_target_id = null

  static init(app) {
    this.app = app
    const dragDrop = this.controller()
    dragDrop.bind($('.resources')[0])
  }

  static controller() {
    return new DragDrop({
      dragSelector: '.resource',
      dropSelector: '.resource',
      callbacks: {
        dragstart: this.drag,
        drop: this.drop
      }
    })
  }

  static drag(e) {
    let source_id = $(e.target).data('id')
    if(source_id == undefined)
      source_id = $(e.toElement).parents('div.resource').data('id')

    DraggableResources.current_source_id = source_id

    $('.resources').addClass('droppable')
    $('.resource:not(.source)').on('mouseover', )
    DraggableResources.source().addClass('source')
  }

  static drop(e) {
    let target_id = $(e.target).parents('.resource').data('id')
    DraggableResources.current_target_id = target_id

    $('.resources').removeClass('droppable')
    DraggableResources.source().removeClass('source')

    // TODO: recalculate positions instead of doing the thing below.
    // Adding new resources will fuck with this because their default value
    // will be "1", so you'll end up with two "2" references.
    window.pr.api.set(`${DraggableResources.current_source_id}_position`, DraggableResources.target().data('position'))
    window.pr.api.set(`${DraggableResources.current_target_id}_position`, DraggableResources.source().data('position'))
  }

  static source() {
    return $(`[data-id="${DraggableResources.current_source_id}"]`)
  }

  static target() {
    return $(`[data-id="${DraggableResources.current_target_id}"]`)
  }
}
