import loader from './loader'
import wait from './wait'

window.addEventListener('load', init, false)

function init(e) {
  const image = loader.image("gfx.png")
  wait(
    [
      image.load()
    ],
    () => {}
  )
}
