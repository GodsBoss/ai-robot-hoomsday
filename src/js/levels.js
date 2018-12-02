const levels = [
  {
    id: "tutorial_1_just_start",
    position: {
      x: 10,
      y: 40
    },
    tiles: [
      {
        type: "tile_exit",
        col: 14,
        row: 1
      },
      {
        type: "tile_start_stop",
        col: 14,
        row: 3
      },
      {
        type: "tile_source",
        col: 2,
        row: 8,
        amount: 5,
        direction: "right"
      },
      {
        type: "tile_block",
        col: 5,
        row: 8
      },
      {
        type: "tile_block",
        col: 4,
        row: 10
      },
      {
        type: "tile_block",
        col: 2,
        row: 9
      },
      {
        type: "tile_block",
        col: 3,
        row: 4
      },
      {
        type: "tile_sink",
        col: 12,
        row: 5,
        amount: 5
      },
      {
        type: "tile_help",
        col: 16,
        row: 2
      }
    ]
  },
  {
    id: "tutorial_2_multiple_stuff",
    position: {
      x: 40,
      y: 40
    },
    tiles: [
      {
        type: "tile_exit",
        col: 2,
        row: 8
      },
      {
        type: "tile_exit",
        col: 15,
        row: 8
      },
      {
        type: "tile_start_stop",
        col: 14,
        row: 3
      },
      {
        type: "tile_start_stop",
        col: 17,
        row: 6
      },
      {
        type: "tile_source",
        col: 2,
        row: 2,
        amount: 3,
        direction: "down"
      },
      {
        type: "tile_source",
        col: 15,
        row: 2,
        amount: 3,
        direction: "down"
      },
      {
        type: "tile_sink",
        col: 6,
        row: 5,
        amount: 2
      },
      {
        type: "tile_sink",
        col: 8,
        row: 5,
        amount: 4
      },
      {
        type: "tile_block",
        col: 0,
        row: 4
      },
      {
        type: "tile_block",
        col: 13,
        row: 7
      }
    ]
  },
  {
    id: "tutorial_3_arrow_and_reset",
    position: {
      x: 70,
      y: 40
    },
    tiles: [
      {
        type: "tile_source",
        col: 4,
        row: 4,
        amount: 1,
        direction: "right"
      },
      {
        type: "tile_start_stop",
        col: 7,
        row: 8
      },
      {
        type: "tile_reset",
        col: 8,
        row: 8
      },
      {
        type: "tile_exit",
        col: 9,
        row: 8
      },
      {
        type: "tile_help",
        col: 10,
        row: 8
      },
      {
        type: "tile_sink",
        col: 6,
        row: 6,
        amount: 1
      },
      {
        type: "tile_movable_arrow",
        col: 9,
        row: 6,
        direction: "down"
      }
    ]
  }
]

export default levels
