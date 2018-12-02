import { filters } from '../objects'
import State from '../State'

export default class LevelSelect extends State {
  constructor(levels) {
    super()
    this.levels = levels
  }

  init(game) {
    game.objects.push(
      {
        type: "bg_title",
        x: 0,
        y: 0,
        w: 320,
        h: 200
      }
    )
    this.levels.forEach(
      (level, index) => {
        game.objects.push(
          {
            type: "level_select_level",
            frame: 0,
            animation: Math.floor(Math.random() * 5),
            x: level.position.x,
            y: level.position.y,
            w: 39,
            h: 22,
            z: 1000,
            levelIndex: index
          }
        )
      }
    )
  }

  invoke(game, event) {
    if (event.type === 'click') {
      const clickedObj = game.objects.find(
        filters.every(
          filters.byTypes('level_select_level', 'level_select_level_active', 'level_select_start'),
          filters.byPosition(event)
        )
      )
      if (typeof clickedObj === 'undefined') {
        unselectLevel(game)
        return
      }
      if (clickedObj.type === 'level_select_level_active') {
        return
      }
      if (clickedObj.type === 'level_select_level') {
        selectLevel(game, clickedObj)
      }
      if (clickedObj.type === 'level_select_start') {
        game.data.levelToPlay = clickedObj.levelIndex
        game.nextState('play')
      }
    }
  }

  tick(game) {
    game.objects.
      filter(filters.byTypes('level_select_level', 'level_select_level_active', 'level_select_start')).
      forEach(
        (l) => {
          l.animation++
          if (l.animation >= 5) {
            l.animation = 0
            l.frame = (l.frame + 1) % animationFrames[l.type]
          }
        }
      )
  }
}

const animationFrames = {
  "level_select_level": 6,
  "level_select_level_active": 6,
  "level_select_start": 4
}

function selectLevel(game, clickedLevel) {
  unselectLevel(game)
  game.objects.push(
    {
      type: 'level_select_level_active',
      x: clickedLevel.x,
      y: clickedLevel.y,
      w: 22,
      h: 19,
      z: 1000,
      frame: 0,
      animation: 0,
      levelIndex: clickedLevel.levelIndex
    }
  )
  game.objects.push(
    {
      type: 'level_select_start',
      x: 160,
      y: 150,
      w: 16,
      h: 16,
      z: 1000,
      frame: 0,
      animation: 0,
      levelIndex: clickedLevel.levelIndex
    }
  )
  game.objects = game.objects.filter(filters.not(filters.is(clickedLevel)))
}

function unselectLevel(game) {
  game.objects.
    filter(filters.byType('level_select_level_active')).
    forEach(
      (l) => {
        game.objects.push(
          {
            type: 'level_select_level',
            x: l.x,
            y: l.y,
            w: 22,
            h: 19,
            z: 1000,
            frame: 0,
            animation: 0,
            levelIndex: l.levelIndex
          }
        )
      }
    )
  game.objects = game.objects.filter(filters.not(filters.byType('level_select_level_active')))
  game.objects = game.objects.filter(filters.not(filters.byType('level_select_start')))
}
