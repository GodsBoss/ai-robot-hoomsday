import { filters, sortCriteria, sorted } from '../objects'
import State from '../State'

export default class Play extends State {
  constructor(levels) {
    super()
    this.levels = levels
  }

  init(game) {
    game.data.playing = {
      running: false
    }
    initLevel(game, this.levels[game.data.levelToPlay])
  }

  tick(game) {
    if (game.data.playing.running) {
      this.tickRunning(game)
    }
  }

  tickRunning(game) {
    game.objects.
      filter(filters.byType('ai_robot')).
      forEach(
        (robot) => {
          robot.x += directions[robot.direction].x * robotSpeedPerTick * 16
          robot.y += directions[robot.direction].y * robotSpeedPerTick * 16
        }
      )
    game.objects.
      filter(filters.byType('tile_source')).
      filter((source) => source.amount > 0).
      forEach(
        (source) => {
          if (source.waitTime <= 0) {
            source.amount--;
            source.waitTime += 2 / robotSpeedPerTick;
            game.objects.push(
              {
                type: 'ai_robot',
                x: source.x,
                y: source.y,
                z: 3000,
                direction: source.direction
              }
            )
          } else {
            source.waitTime--
          }
        }
      )
  }

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
    (tile) => {
      const obj = {
        type: tile.type,
        x: tile.col * 16 + gridOffset.x,
        y: tile.row * 16 + gridOffset.y,
        w: 16,
        h: 16,
        z: 1000
      }
      const f = createTile[tile.type]
      if (typeof f === 'function') {
        f(game, tile, obj)
      }
      game.objects.push(obj)
    }
  )
}

const createTile = {
  "tile_source": (game, tile, obj) => {
    game.objects.push(
      {
        type: `tile_direction_${tile.direction}`,
        x: obj.x,
        y: obj.y,
        w: 16,
        h: 16,
        z: 2000
      }
    )
    obj.amount = tile.amount
    obj.waitTime = 0
    obj.direction = tile.direction
  },
  "tile_sink": (game, tile, obj) => {
    obj.amount = tile.amount
  }
}

const clickActions = {
  "tile_exit": (state, game, obj) => {
    game.nextState('title')
  },
  "tile_reset": (state, game, obj) => {
    initLevel(game, state.levels[game.data.levelToPlay])
  },
  "tile_start_stop": (state, game, obj) => {
    if (game.data.playing.running) {

    } else {

    }
    game.data.playing.running = !game.data.playing.running
    obj.frame = game.data.playing.running ? 1 : 0
  }
}

const gridOffset = {
  x: 16,
  y: 4
}

// robotSpeedPerTick is the speed of robots, measured in grid fields / tick.
const robotSpeedPerTick = 1 / 4

const directions = {
  up: {
    x: 0,
    y: -1
  },
  down: {
    x: 0,
    y: 1
  },
  left: {
    x: -1,
    y: 0
  },
  right: {
    x: 1,
    y: 0
  }
}
