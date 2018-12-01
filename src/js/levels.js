const levels = [
  {
    id: "first",
    position: {
      x: 10,
      y: 40
    },
    tiles: [
      {
        type: "exit",
        col: 2,
        row: 2
      },
      {
        type: "reset",
        col: 3,
        row: 2
      },
      {
        type: "start_stop",
        col: 4,
        row: 2
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
        type: "exit",
        col: 2,
        row: 2
      },
      {
        type: "reset",
        col: 3,
        row: 2
      },
      {
        type: "start_stop",
        col: 4,
        row: 2
      }
    ]
  }
]

export default levels
