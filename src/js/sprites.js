import { HORIZONTAL, VERTICAL } from './SpriteAtlas'

const sprites = [].concat(
  [
    {
      type: "bg_title",
      x: 320,
      y: 0,
      w: 320,
      h: 200
    },
    {
      type: "intro_panel",
      x: 480,
      y: 200,
      w: 160,
      h: 80,
      frames: 5,
      dir: VERTICAL
    }
  ],
  createLetterSprites()
);

function createLetterSprites() {
  const sprites = []
  for(let charCode = 65; charCode <= 90; charCode++) {
    sprites.push(
      {
        type: `letter_${String.fromCharCode(charCode)}`,
        x: (charCode - 65) * 6,
        y: 0,
        w: 5,
        h: 5
      }
    )
  }
  for(let i = 0; i <= 9; i++) {
    sprites.push(
      {
        type: `letter_${i}`,
        x: (26 + i) * 6,
        y: 0,
        w: 5,
        h: 5
      }
    )
  }
  const punctuation = ['.', ',', '!', '?', ':', '-', '=']
  punctuation.forEach(
    (char, index) => sprites.push(
      {
        type: `letter_${char}`,
        x: (26 + 10 + index) * 6,
        y: 0,
        w: 5,
        h: 5
      }
    )
  )
  return sprites
}

export default sprites
