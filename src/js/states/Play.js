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
    fadeHelpCursors(game)
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

function fadeHelpCursors(game) {
  game.objects.filter(
    filters.byType('help_cursor')
  ).forEach(
    (cursor) => {
      cursor.lifetime--
      cursor.frame = 0
      if (cursor.lifetime > startCursorLifeTime * 1/3 && cursor.lifetime < startCursorLifeTime * 2/3) {
        cursor.frame = 1
      }
    }
  )
  game.objects = game.objects.filter(
    (obj) => {
      if (obj.type === 'help_cursor') {
        return obj.lifetime > 0
      }
      return true
    }
  )
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
  "tile_movable_arrow": removeAfterUse(
    (game, robot, tile) => {
      robot.direction = tile.direction
      return true
    }
  ),
  "tile_movable_stop": removeAfterUse(
    (game, robot, tile) => {
      const block = {
        type: 'tile_robot_block',
      }
      setGridPosition(block, robot)
      game.objects.push(block)
      return false
    }
  ),
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

function removeAfterUse(fieldAction) {
  return (game, robot, tile) => {
    const result = fieldAction(game, robot, tile)
    game.objects = game.objects.filter(filters.not(filters.is(tile)))
    return result
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
  "tile_exit": simpleObstacleCollision,
  "tile_help": simpleObstacleCollision,
  "tile_movable_block": simpleObstacleCollision,
  "tile_reset": simpleObstacleCollision,
  "tile_robot_block": simpleObstacleCollision,
  "tile_start_stop": simpleObstacleCollision
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
        source: tile,
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
  "tile_movable_arrow": (game, tile, obj) => {
    obj.direction = tile.direction
    obj.frame = arrowFrames[obj.direction]
  },
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

const arrowFrames = {
  "up": 0,
  "right": 1,
  "down": 2,
  "left": 3
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
  "move_marker": (state, game, obj) => {
    setGridPosition(game.data.playing.chosenForMove, obj)
    if (typeof game.data.playing.chosenForMove.source !== 'undefined') {
      game.data.playing.chosenForMove.source.col = obj.col
      game.data.playing.chosenForMove.source.row = obj.row
    }
    removeMoveMarkers(game)
    delete game.data.playing.chosenForMove
    xableClickables(game, true)
  },
  "tile_exit": (state, game, obj) => {
    if (obj.frame !== 1) {
      game.nextState('title')
    }
  },
  "tile_help": (state, game, obj) => {
    if (obj.frame === 1) {
      return
    }
    game.objects = game.objects.filter(
      filters.not(
        filters.byType('help_cursor')
      )
    )
    game.objects.filter(
      filters.byTypes(...Object.keys(clickActions))
    ).forEach(
      (obj) => {
        game.objects.push(
          {
            type: "help_cursor",
            x: obj.x + 5,
            y: obj.y + 5,
            frame: 0,
            lifetime: startCursorLifeTime,
            z: 10000
          }
        )
      }
    )
  },
  "tile_movable_arrow": startMoveTile,
  "tile_movable_block": startMoveTile,
  "tile_movable_bomb": startMoveTile,
  "tile_movable_stop": startMoveTile,
  "tile_reset": (state, game, obj) => {
    if (obj.frame !== 1) {
      initLevel(game, state.levels[game.data.levelToPlay])
    }
  },
  "tile_start_stop": (state, game, obj) => {
    if (game.data.playing.running) {
      tilesToObjects(game)
    } else if(obj.frame !== 2) {
      xableClickables(game, false, true)
    } else {
      return
    }
    game.data.playing.running = !game.data.playing.running
  }
}

function xableClickables(game, enabled, running) {
  game.objects.
    filter(filters.byTypes(
      "tile_exit",
      "tile_help",
      "tile_reset"
    )).
    forEach(
      (tile) => tile.frame = enabled ? 0 : 1
    )
    game.objects.
      filter(filters.byType(
        "tile_start_stop"
      )).
      forEach(
        (tile) => tile.frame = enabled ? 0 : (running ? 1 : 2)
      )
}

function startMoveTile(state, game, obj) {
  if (game.data.playing.running) {
    return
  }
  removeMoveMarkers(game) // Remove (possibly) existing markers.
  if (game.data.playing.chosenForMove === obj) {
    // Cancel movement when the same object currently 'in move' is clicked.
    delete game.data.playing.chosenForMove
    xableClickables(game, true, false)
    return
  }
  xableClickables(game, false, false)
  const occupyingTiles = game.objects.filter(
    filters.byTypes(
      "tile_block",
      "tile_exit",
      "tile_help",
      "tile_movable_block",
      "tile_movable_bomb",
      "tile_reset",
      "tile_sink",
      "tile_source",
      "tile_start_stop"
    )
  )
  for(let col = 0; col < 18; col++) {
    for(let row = 0; row < 12; row++) {
      if (typeof occupyingTiles.find(byGridPosition(col, row)) !== 'undefined') {
        continue
      }

      const marker = {
        type: 'move_marker',
        w: 16,
        h: 16,
        z: 20000,
        frame: 0
      }
      setGridPosition(marker, { col, row })
      game.objects.push(marker)
    }
  }
  game.data.playing.chosenForMove = obj
}

function removeMoveMarkers(game) {
  game.objects = game.objects.filter(filters.not(filters.byType('move_marker')))
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

const startCursorLifeTime = 20
