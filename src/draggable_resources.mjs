export default class DraggableResources {
  static init() {
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

  static drag() {
    console.log('drag')
  }

  static drop() {
    console.log('drop')
  }
}
