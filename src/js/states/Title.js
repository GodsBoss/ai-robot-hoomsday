import State from '../State'

export default class Title extends State {
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
        type: "screen_title",
        x: 0,
        y: 0,
        w: 320,
        h: 200
      }
    )
  }

  invoke(game, event) {
    if (event.type === 'click') {
      game.nextState('level_select')
    }
  }
}
