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
            x: level.position.x,
            y: level.position.y,
            w: 16,
            h: 16,
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
          filters.some(
            filters.byType('level_select_level'),
            filters.byType('level_select_start')
          ),
          filters.byPosition(event)
        )
      )
      if (typeof clickedObj === 'undefined') {
        unselectLevel(game)
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
}

function selectLevel(game, clickedLevel) {
  unselectLevel(game)
  clickedLevel.frame = 1
  game.objects.push(
    {
      type: 'level_select_start',
      x: 160,
      y: 150,
      w: 16,
      h: 16,
      z: 1000,
      levelIndex: clickedLevel.levelIndex
    }
  )
}

function unselectLevel(game) {
  game.objects.
    filter(filters.byType('level_select_level')).
    forEach((level) => level.frame = 0)
  game.objects = game.objects.filter(filters.not(filters.byType('level_select_start')))
}
