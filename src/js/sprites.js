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
    },
    {
      type: "level_select_level", // TODO: Real level icons
      x: 32,
      y: 16,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: "level_select_start", // TODO: Real start button
      x: 16,
      y: 16,
      w: 16,
      h: 16
    },
    {
      type: "tile_ground",
      x: 0,
      y: 16,
      w: 16,
      h: 16
    },
    {
      type: "tile_block",
      x: 16,
      y: 16,
      w: 16,
      h: 16
    },
    {
      type: "tile_start_stop",
      x: 32,
      y: 16,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: "tile_exit",
      x: 64,
      y: 16,
      w: 16,
      h: 16,
      frames: 2,
      dir: VERTICAL
    },
    {
      type: "tile_source",
      x: 0,
      y: 32,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: "tile_sink",
      x: 32,
      y: 32,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: "tile_reset",
      x: 80,
      y: 16,
      w: 16,
      h: 16,
      frames: 2,
      dir: VERTICAL
    },
    {
      type: "tile_direction_up",
      x: 0,
      y: 48,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: "tile_direction_right",
      x: 32,
      y: 48,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: "tile_direction_down",
      x: 64,
      y: 48,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: "tile_direction_left",
      x: 96,
      y: 48,
      w: 16,
      h: 16,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: 'ai_robot',
      x: 0,
      y: 64,
      w: 16,
      h: 16
    },
    {
      type: 'item_bomb',
      x: 64,
      y: 16,
      w: 16,
      h: 16
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
