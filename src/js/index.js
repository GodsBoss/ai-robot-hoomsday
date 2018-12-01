import Game from './Game'
import loader from './loader'
import { start } from './Loop'
import Renderer from './Renderer'
import { SpriteAtlas } from './SpriteAtlas'
import sprites from './sprites'
import Title from './states/Title'
import wait from './wait'

window.addEventListener('load', init, false)

// TPS is the amount of game ticks per second.
const TPS = 25

function init(e) {
  const size = {
    width: 320,
    height: 200
  }
  const image = loader.image("gfx.png")
  wait(
    [
      image.load()
    ],
    () => {
      const game = new Game()
      game.nextState(new Title())
      start(
        (next) => {
          window.setTimeout(next, 1000 / TPS, next)
        },
        () => game.tick()
      )
      const canvas = createGUI(size)
      const atlas = (new SpriteAtlas(image.element)).extractSprites(sprites)
      const renderer = new Renderer(canvas, atlas)
      start(
        (next) => {
          window.requestAnimationFrame(next)
        },
        () => renderer.render(game)
      )
    }
  )
}

function createGUI(size) {
  const gui = document.createElement('canvas')
  gui.width = size.width
  gui.height = size.height
  document.body.appendChild(gui)
  const css = document.createElement('style')
  css.type = "text/css"
  css.innerHTML =
    `
      canvas {
        border: 1px solid #ddd;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    `
  document.head.appendChild(css)
  return gui
}
