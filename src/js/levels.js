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
  },
  {
    id: "normal_arrows_1",
    position: {
      x: 100,
      y: 40
    },
    tiles: [
      {
        type: "tile_source",
        col: 2,
        row: 6,
        direction: "right",
        amount: 3
      },
      {
        type: "tile_sink",
        col: 4,
        row: 4,
        amount: 1
      },
      {
        type: "tile_block",
        col: 4,
        row: 2
      },
      {
        type: "tile_sink",
        col: 6,
        row: 8,
        amount: 1
      },
      {
        type: "tile_block",
        col: 6,
        row: 10
      },
      {
        type: "tile_sink",
        col: 3,
        row: 9,
        amount: 1
      },
      {
        type: "tile_block",
        col: 3,
        row: 8
      },
      {
        type: "tile_block",
        col: 3,
        row: 10
      },
      {
        type: "tile_block",
        col: 12,
        row: 6
      },
      {
        type: "tile_block",
        col: 17,
        row: 6
      },
      {
        type: "tile_start_stop",
        col: 10,
        row: 1
      },
      {
        type: "tile_reset",
        col: 11,
        row: 1
      },
      {
        type: "tile_exit",
        col: 12,
        row: 1
      },
      {
        type: "tile_help",
        col: 13,
        row: 1
      },
      {
        type: "tile_movable_arrow",
        col: 12,
        row: 10,
        direction: "up"
      },
      {
        type: "tile_movable_arrow",
        col: 1,
        row: 11,
        direction: "down"
      },
      {
        type: "tile_movable_arrow",
        col: 8,
        row: 2,
        direction: "left"
      }
    ]
  },
  {
    id: "normal_arrows_2",
    position: {
      x: 130,
      y: 40
    },
    tiles: [
      {
        type: "tile_block",
        col: 1,
        row: 1
      },
      {
        type: "tile_source",
        col: 0,
        row: 3,
        direction: "right",
        amount: 3
      },
      {
        type: "tile_block",
        col: 0,
        row: 4
      },
      {
        type: "tile_sink",
        col: 3,
        row: 5,
        amount: 2
      },
      {
        type: "tile_block",
        col: 5,
        row: 5
      },
      {
        type: "tile_sink",
        col: 7,
        row: 1,
        amount: 3
      },
      {
        type: "tile_source",
        col: 10,
        row: 4,
        amount: 2,
        direction: "left"
      },
      {
        type: "tile_block",
        col: 12,
        row: 3
      },
      {
        type: "tile_block",
        col: 11,
        row: 6
      },
      {
        type: "tile_movable_arrow",
        col: 3,
        row: 3,
        direction: "down"
      },
      {
        type: "tile_movable_arrow",
        col: 3,
        row: 4,
        direction: "down"
      },
      {
        type: "tile_movable_arrow",
        col: 7,
        row: 3,
        direction: "up"
      },
      {
        type: "tile_movable_arrow",
        col: 7,
        row: 4,
        direction: "up"
      },
      {
        type: "tile_movable_arrow",
        col: 11,
        row: 3,
        direction: "down"
      },
      {
        type: "tile_start_stop",
        col: 4,
        row: 10
      },
      {
        type: "tile_reset",
        col: 5,
        row: 10
      },
      {
        type: "tile_exit",
        col: 6,
        row: 10
      },
      {
        type: "tile_help",
        col: 7,
        row: 10
      }
    ]
  },
  {
    id: "tutorial_4_stop",
    position: {
      x: 160,
      y: 40
    },
    tiles: [
      {
        type: "tile_source",
        col: 8,
        row: 8,
        amount: 3,
        direction: "up"
      },
      {
        type: "tile_sink",
        col: 12,
        row: 6,
        amount: 2
      },
      {
        type: "tile_movable_stop",
        col: 4,
        row: 4
      },
      {
        type: "tile_start_stop",
        col: 4,
        row: 10
      },
      {
        type: "tile_reset",
        col: 5,
        row: 10
      },
      {
        type: "tile_exit",
        col: 6,
        row: 10
      },
      {
        type: "tile_help",
        col: 7,
        row: 10
      }
    ]
  },
  {
    id: "normal_stop_1",
    position: {
      x: 190,
      y: 40
    },
    tiles: [
      {
        type: "tile_start_stop",
        col: 0,
        row: 0
      },
      {
        type: "tile_reset",
        col: 0,
        row: 1
      },
      {
        type: "tile_exit",
        col: 0,
        row: 2
      },
      {
        type: "tile_help",
        col: 0,
        row: 3
      },
      {
        type: "tile_sink",
        col: 2,
        row: 2,
        amount: 4
      },
      {
        type: "tile_source",
        col: 2,
        row: 5,
        amount: 3,
        direction: "up"
      },
      {
        type: "tile_source",
        col: 7,
        row: 0,
        amount: 5,
        direction: "down"
      },
      {
        type: "tile_sink",
        col: 7,
        row: 4,
        amount: 2
      },
      {
        type: "tile_movable_stop",
        col: 10,
        row: 8
      },
      {
        type: "tile_movable_stop",
        col: 11,
        row: 8
      }
    ]
  },
  {
    id: "normal_stop_2",
    position: {
      x: 220,
      y: 40
    },
    tiles: [
      {
        type: "tile_start_stop",
        col: 12,
        row: 2
      },
      {
        type: "tile_reset",
        col: 12,
        row: 3
      },
      {
        type: "tile_exit",
        col: 12,
        row: 4
      },
      {
        type: "tile_help",
        col: 12,
        row: 5
      },
      {
        type: "tile_source",
        col: 4,
        row: 2,
        direction: "down",
        amount: 4
      },
      {
        type: "tile_block",
        col: 3,
        row: 11
      },
      {
        type: "tile_sink",
        col: 6,
        row: 4,
        amount: 2
      },
      {
        type: "tile_block",
        col: 0,
        row: 5
      },
      {
        type: "tile_block",
        col: 3,
        row: 0
      },
      {
        type: "tile_block",
        col: 5,
        row: 0
      },
      {
        type: "tile_block",
        col: 5,
        row: 1
      },
      {
        type: "tile_block",
        col: 5,
        row: 2
      },
      {
        type: "tile_movable_stop",
        col: 4,
        row: 4
      },
      {
        type: "tile_movable_stop",
        col: 3,
        row: 4
      },
      {
        type: "tile_movable_stop",
        col: 5,
        row: 4
      }
    ]
  }
]

export default levels
