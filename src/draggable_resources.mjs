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

    if(source_id == undefined) {
      source_id = $(e.toElement).parents('div.resource').data('id')
    }

    DraggableResources.current_source_id = source_id
  }

  static drop(e) {
    let target_id = $(e.target).parents('.resource').data('id')
    DraggableResources.current_target_id = target_id
  }
}
