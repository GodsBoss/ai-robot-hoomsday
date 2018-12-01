export default class Renderer{
  constructor(canvas, atlas) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.atlas = atlas
  }

  render(game) {
    this.context.fillStyle = '#000000'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    game.objects.forEach(
      (obj) => {
        const frame = typeof obj.frame === 'number' ? obj.frame : 0
        this.context.drawImage(this.atlas.getSprite(obj.type, frame).image, obj.x, obj.y)
      }
    )
  }
}
