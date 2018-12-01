import State from '../State'

export default class Play extends State {
  constructor(levels) {
    super()
    this.levels = levels
  }

  init(game) {}

  tick(game) {}

  invoke(game, event) {}
}
