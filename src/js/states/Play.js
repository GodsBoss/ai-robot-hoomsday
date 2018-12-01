import State from '../State'

export default class Play extends State {
  constructor(levels) {
    super()
    this.levels = levels
  }

  init(game) {
    for(let column = 0; column < 18; column++) {
      for(let row = 0; row < 12; row++) {
        game.objects.push(
          {
            type: 'tile_ground',
            x: column * 16 + gridOffset.x,
            y: row * 16 + gridOffset.y
          }
        )
      }
    }
    this.levels[game.data.levelToPlay].tiles.forEach(
      (tile) => game.objects.push(
        {
          type: tile.type,
          x: tile.col * 16 + gridOffset.x,
          y: tile.row * 16 + gridOffset.y,
          w: 16,
          h: 16
        }
      )
    )
  }

  tick(game) {}

  invoke(game, event) {}
}

const gridOffset = {
  x: 16,
  y: 4
}
