import { HORIZONTAL, VERTICAL } from './SpriteAtlas'

const sprites = [].concat(
  [
    {
      type: "bg",
      x: 320,
      y: 0,
      w: 320,
      h: 200
    },
    {
      type: "screen_title",
      x: 0,
      y: 200,
      w: 320,
      h: 200
    },
    {
      type: "screen_level_select",
      x: 0,
      y: 400,
      w: 320,
      h: 200
    },
    {
      type: "screen_level_over",
      x: 0,
      y: 600,
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
      type: "level_select_level",
      x: 274,
      y: 39,
      w: 22,
      h: 19,
      frames: 6,
      dir: VERTICAL
    },
    {
      type: "level_select_level_active",
      x: 296,
      y: 39,
      w: 22,
      h: 19,
      frames: 6,
      dir: VERTICAL
    },
    {
      type: "level_select_start",
      x: 200,
      y: 50,
      w: 20,
      h: 20,
      frames: 4,
      dir: VERTICAL
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
      type: "tile_cracked_block",
      x: 32,
      y: 16,
      w: 16,
      h: 16
    },
    {
      type: "tile_block_wreck",
      x: 48,
      y: 16,
      w: 16,
      h: 16
    },
    {
      type: "tile_movable_block",
      x: 128,
      y: 16,
      w: 16,
      h: 16
    },
    {
      type: "tile_start_stop",
      x: 64,
      y: 64,
      w: 16,
      h: 16,
      frames: 3,
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
      type: "tile_help",
      x: 112,
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
      type: 'tile_movable_arrow',
      x: 160,
      y: 16,
      w: 16,
      h: 16,
      frames: 4,
      dir: VERTICAL
    },
    {
      type: 'tile_movable_bomb',
      x: 96,
      y: 16,
      w: 16,
      h: 16
    },
    {
      type: 'tile_movable_stop',
      x: 128,
      y: 32,
      w: 16,
      h: 16
    },
    {
      type: 'help_cursor',
      x: 216,
      y: 21,
      w: 14,
      h: 17,
      frames: 2,
      dir: HORIZONTAL
    },
    {
      type: 'move_marker',
      x: 144,
      y: 16,
      w: 16,
      h: 16,
      frames: 2,
      dir: VERTICAL
    },
    {
      type: 'tile_robot_block',
      x: 16,
      y: 64,
      w: 16,
      h: 16
    },
    {
      type: 'fx_explosion',
      x: 0,
      y: 80,
      w: 48,
      h: 48,
      frames: 4,
      dir: HORIZONTAL
    },
    {
      type: 'fx_robot_wreck',
      x: 32,
      y: 64,
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
