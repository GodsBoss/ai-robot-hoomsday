import Game from './Game'
import loader from './loader'
import { start } from './Loop'
import wait from './wait'

window.addEventListener('load', init, false)

// TPS is the amount of game ticks per second.
const TPS = 25

function init(e) {
  const image = loader.image("gfx.png")
  wait(
    [
      image.load()
    ],
    () => {
      const game = new Game()
      start(
        (next) => {
          window.setTimeout(next, 1000 / TPS, next)
        },
        () => game.tick()
      )
    }
  )
}
