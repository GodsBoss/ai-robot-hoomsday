import State from '../State'

export default class LevelOver extends State {
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
  }

  invoke(game, event) {
    if (event.type === 'click') {
      game.nextState('level_select')
    }
  }
}
