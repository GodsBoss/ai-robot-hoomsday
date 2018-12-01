import { filters, sortCriteria, sorted } from '../objects'
import State from '../State'

export default class Play extends State {
  constructor(levels) {
    super()
    this.levels = levels
  }

  init(game) {
    initLevel(game, this.levels[game.data.levelToPlay])
  }

  tick(game) {}

  invoke(game, event) {
    if (event.type === 'click') {
      const clickedObj = sorted(sortCriteria.reversed(sortCriteria.byZ))(game.objects).find(filters.byPosition(event))
      if (typeof clickedObj === 'undefined') {
        return
      }
      const f = clickActions[clickedObj.type]
      if (typeof f === 'function') {
        f(this, game, clickedObj)
      }
    }
  }
}

function initLevel(game, level) {
  game.objects = []
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
  level.tiles.forEach(
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

const clickActions = {
  "tile_exit": (state, game, obj) => {
    game.nextState('title')
  },
  "tile_reset": (state, game, obj) => {
    initLevel(game, state.levels[game.data.levelToPlay])
  }
}

const gridOffset = {
  x: 16,
  y: 4
}
