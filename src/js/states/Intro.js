import State from '../State'
import Title from './Title'

export default class Intro extends State {
  init(game) {
    game.objects.push(
      {
        type: "bg",
        x: 0,
        y: 0,
        w: 320,
        h: 200
      }
    )
    game.objects.push(
      {
        type: "intro_panel",
        x: panelPositions[0].x,
        y: panelPositions[0].y,
        w: 160,
        h: 80
      }
    )
    game.data.introState = {
      panel: 0
    }
  }

  invoke(game, event) {
    if (event.type === 'click') {

      game.data.introState.panel++
      if (game.data.introState.panel >= panelPositions.length) {
        game.nextState("title")
      }
    }
    game.objects.filter(
      (obj) => obj.type === "intro_panel"
    ).forEach(
      (obj) => {
        obj.frame = game.data.introState.panel
        obj.x = panelPositions[game.data.introState.panel].x
        obj.y = panelPositions[game.data.introState.panel].y
      }
    )
  }
}

const panelPositions = [
  {
    x: 10,
    y: 60
  },
  {
    x: 70,
    y: 70
  },
  {
    x: 30,
    y: 90
  },
  {
    x: 90,
    y: 80
  },
  {
    x: 80,
    y: 90
  }
]
