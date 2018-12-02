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
    tickRobots(game)
    produceRobots(game)
    checkForVictory(game)
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

function checkForVictory(game) {
  if (
    game.objects.filter(
      filters.byType('tile_sink')
    ).reduce(
      (acc, tile) => acc + tile.amount,
      0
    ) == 0
  ) {
    game.nextState('level_over')
  }
}

function tickRobots(game) {
  const movedRobots = moveRobots(game)
  const deadRobots = []
  movedRobots.forEach(
    (robot) => {
      const survivedField = handleFieldEvent(game, robot)
      if (!survivedField) {
        deadRobots.push(robot)
        return
      }
      const survivedCollisions = handleCollisionEvents(game, robot)
      if (!survivedCollisions) {
        deadRobots.push(robot)
      }
    }
  )
  if (deadRobots.length === 0) {
    return true
  }
  game.objects = game.objects.filter(
    filters.some(
      filters.not(
        filters.byType('ai_robot')
      ),
      (robot) => deadRobots.every(
        (deadRobot) => robot !== deadRobot
      )
    )
  )
}

// moveRobots moves all robots. Returns a list of robots which just landed on
// new grid fields.
function moveRobots(game) {
  const movedRobots = []
  game.objects.
    filter(filters.byType('ai_robot')).
    forEach(
      (robot) => {
        const dir = directions[robot.direction]
        robot.x += dir.x * robotSpeedPerTick * 16
        robot.y += dir.y * robotSpeedPerTick * 16
        const dist = {
          col: (robot.x - gridOffset.x) / 16 - robot.col - dir.x,
          row: (robot.y - gridOffset.y) / 16 - robot.row - dir.y
        }
        if (Math.abs(dist.col + dist.row) <= robotSpeedPerTick * 1.01) {
          setGridPosition(
            robot,
            {
              col: robot.col + dir.x,
              row: robot.row + dir.y
            }
          )
          movedRobots.push(robot)
        }
      }
    )
  return movedRobots
}

// handleFieldEvent handles stuff on the field the robot is currently on.
// Returns wether it survives.
function handleFieldEvent(game, robot) {
  const tile = game.objects.find(
    filters.every(
      filters.byTypes(...Object.keys(fieldActions)),
      byGridPosition(robot.col, robot.row)
    )
  )
  if (typeof tile === 'undefined') { // Nothing special, everything is working perfectly fine.
    return true
  }
  return fieldActions[tile.type](game, robot, tile)
}

const fieldActions = {
  "tile_sink": (game, robot, tile) => {
    if (tile.amount <= 0) {
      return true
    }
    tile.amount--
    replaceAmountMarker(game, tile)
    if (tile.amount <= 0) {
      tile.frame = 1
    }
    return false
  }
}

// handleCollisionEvents handles stuff on the field the robot will move to.
// Returns wether it survives.
function handleCollisionEvents(game, robot) {
  // This is run as long the robot collided with a block, survived and changed direction.
  // To avoid endless loops, overflow protection is builtin.
  for(let overFlowProtection = 0; overFlowProtection < 100; overFlowProtection++) {
    const nextGridPosition = {
      col: robot.col + directions[robot.direction].x,
      row: robot.row + directions[robot.direction].y
    }
    if (
      nextGridPosition.col == -1 ||
      nextGridPosition.row == -1 ||
      nextGridPosition.col == 18 ||
      nextGridPosition.row == 12
    ) {
      collisionActions['tile_block'](game, robot)
      continue
    }
    const tile = game.objects.find(
      filters.every(
        filters.byTypes(...Object.keys(collisionActions)),
        byGridPosition(nextGridPosition.col, nextGridPosition.row)
      )
    )
    if (typeof tile === 'undefined') { // No collision
      return true
    }
    const result = collisionActions[tile.type](game, robot)
    if (!result.survived) { // Robot dead
      return false
    }
    if (!result.changedDirection) { // Direction did not change
      return true
    }
  }
  console.log('handleCollisionEvents: overflow') // 100 collisions are *not* planned!
  return false
}

const collisionActions = {
  "tile_block": simpleObstacleCollision,
  "tile_start_stop": simpleObstacleCollision,
  "tile_exit": simpleObstacleCollision,
  "tile_reset": simpleObstacleCollision
}

function simpleObstacleCollision(game, robot) {
  robot.direction = obstacleCollisionTurns[robot.direction]
  return {
    survived: true,
    changedDirection: true
  }
}

function produceRobots(game) {
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
              col: source.col,
              row: source.row,
              x: source.x,
              y: source.y,
              z: 3000,
              direction: source.direction
            }
          )
          replaceAmountMarker(game, source)
          if (source.amount <= 0) {
            source.frame = 1
          }
        } else {
          source.waitTime--
        }
      }
    )
}

function copyTiles(tiles) {
  return tiles.map(
    (tile) => {
      const copiedTile = {}
      Object.keys(tile).forEach(
        (key) => copiedTile[key] = tile[key]
      )
      return copiedTile
    }
  )
}

function initLevel(game, level) {
  game.data.playing.tiles = copyTiles(level.tiles)
  tilesToObjects(game)
}

function tilesToObjects(game) {
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
  game.data.playing.tiles.forEach(
    (tile) => {
      const obj = {
        type: tile.type,
        w: 16,
        h: 16,
        z: 1000
      }
      setGridPosition(obj, tile)
      const f = createTile[tile.type]
      if (typeof f === 'function') {
        f(game, tile, obj)
      }
      game.objects.push(obj)
    }
  )
}

function setGridPosition(object, pos) {
  object.col = pos.col
  object.row = pos.row
  object.x = pos.col * 16 + gridOffset.x
  object.y = pos.row * 16 + gridOffset.y
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
    replaceAmountMarker(game, obj)
  },
  "tile_sink": (game, tile, obj) => {
    obj.amount = tile.amount
    replaceAmountMarker(game, obj)
  }
}

function replaceAmountMarker(game, obj) {
  if (typeof obj.amountMarker !== 'undefined') {
    game.objects = game.objects.filter(filters.not(filters.is(obj.amountMarker)))
  }
  if (obj.amount <= 0) {
    return
  }
  const marker = {
    type: `letter_${obj.amount}`,
    x: obj.x + 5,
    y: obj.y + 5,
    w: 5,
    h: 5,
    z: 3000
  }
  game.objects.push(marker)
  obj.amountMarker = marker
}

const clickActions = {
  "tile_exit": (state, game, obj) => {
    if (obj.frame !== 1) {
      game.nextState('title')
    }
  },
  "tile_reset": (state, game, obj) => {
    if (obj.frame !== 1) {
      initLevel(game, state.levels[game.data.levelToPlay])
    }
  },
  "tile_start_stop": (state, game, obj) => {
    if (game.data.playing.running) {
      tilesToObjects(game)
    } else {
      game.objects.
        filter(filters.byTypes("tile_exit", "tile_reset", "tile_start_stop")).
        forEach(
          (tile) => tile.frame = 1
        )
    }
    game.data.playing.running = !game.data.playing.running
  }
}

const gridOffset = {
  x: 16,
  y: 4
}

// robotSpeedPerTick is the speed of robots, measured in grid fields / tick.
const robotSpeedPerTick = 1 / 8

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

// obstacleCollisionTurns contains the change in direction when robot runs against
// an obstacle.
const obstacleCollisionTurns = {
  right: "down",
  down: "left",
  left: "up",
  up: "right"
}

// byGridPosition returns a filter for objects which filters them by grid position.
function byGridPosition(col, row) {
  return (tile) => typeof tile.col === 'number' && typeof tile.row === 'number' && tile.col === col && tile.row === row
}
