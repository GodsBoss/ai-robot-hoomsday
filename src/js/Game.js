import State from './State'

export default class Game{
  constructor(){
    // Contains game-relevant data. Survives state switches.
    this.data = {}

    // Contains objects to be rendered. Cleared on state switch.
    this.objects = []

    // Initially, a NOP state.
    this.state = new State()
  }

  nextState(state) {
    this.state = state
    this.objects = []
    state.init(this)
  }

  tick() {
    this.state.tick(this)
  }

  invoke(event) {
    this.state.invoke(this, event)
  }
}
