const levels = [
  {
    id: "first",
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
        type: "tile_reset",
        col: 14,
        row: 2
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
      }
    ]
  },
  {
    id: "second",
    position: {
      x: 30,
      y: 40
    },
    tiles: [
      {
        type: "tile_exit",
        col: 2,
        row: 2
      },
      {
        type: "tile_reset",
        col: 3,
        row: 2
      },
      {
        type: "tile_start_stop",
        col: 4,
        row: 2
      }
    ]
  }
]

export default levels
