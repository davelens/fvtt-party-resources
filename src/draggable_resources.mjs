export default class DraggableResources {
  app= null

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
    let src = $(e.target).data('id')

    if(src == undefined) {
      src = $(e.toElement).parents('div.resource').data('id')
    }

    console.log(src);
  }

  static drop(e) {
    let target = $(e.target).parents('.resource')
    console.log(target.data('id'))
  }
}
