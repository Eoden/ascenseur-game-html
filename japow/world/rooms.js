// Updated to support internal doors using dir property

export const ROOMS = {
  couloir: {
    layout: [
      "1111112111111",
      "1110000000111",
      "1120000000111",
      "1110000000111",
      "1110000000111",
      "1113000000111",
      "1113000000211",
      "1110000000111",
      "1110000000111",
      "1110000000111",
      "1110000000111",
      "1110000000111",
      "1111112111111"
    ],
    exits: [
      { x: 6, y: 0, target: "chambre1", dir: "up" },
      { x: 6, y: 12, target: "chambre2", dir: "down" },
      { x: 2, y: 2, target: "outside", dir: "left" },
      { x: 10, y: 6, target: "salon", dir: "right" }
    ],
    interactives: [
      { x: 3, y: 5, contains: "key" }
    ]
  },

  salon: {
    layout: [
      "1111112112111",
      "1000000050081",
      "2000000000081",
      "1500000000081",
      "1333500000081",
      "1666600000081",
      "1600000000081",
      "1609000000081",
      "1600000099081",
      "1000000099001",
      "1000000099001",
      "1500770000001",
      "1111111111111"
    ],
    exits: [
      { x: 0, y: 2, target: "couloir", dir: "left" },
      { x: 6, y: 0, target: "sdb", dir: "up" },
      { x: 9, y: 0, target: "chambre3", dir: "up" }
    ],
    interactives: [
      { x: 1, y: 4 },
      { x: 2, y: 4 },
      { x: 3, y: 4 }
    ]
  },

  chambre1: {
    layout: [
      "WWWWWWWWWWWWW",
      "WTTTTTT...CCW",
      "WTTTTTT...CCW",
      "W.........CCW",
      "W.........CCW",
      "W...........W",
      "W...........W",
      "W...........W",
      "W...........W",
      "W...........W",
      "W...........W",
      "W...........W",
      "WWWWWWDWWWWWW"
    ],
    exits: [
      { x: 6, y: 12, target: "couloir", dir: "down" }
    ],
    interactives: [
      { x: 9, y: 1 },
      { x: 10, y: 1 },
      { x: 9, y: 2 },
      { x: 10, y: 2 },
      { x: 9, y: 3 },
      { x: 10, y: 3 },
      { x: 9, y: 4 },
      { x: 10, y: 4 }
    ]
  },

  chambre2: {
    layout: [
      "1111112111111",
      "1000000003301",
      "1000000000001",
      "1444400000001",
      "1444400000001",
      "1444400000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ],
    exits: [
      { x: 6, y: 0, target: "couloir", dir: "up" }
    ],
    interactives: [
      { x: 9, y: 1 },
      { x: 10, y: 1 }
    ]
  },

  chambre3: {
    layout: [
      "WWWWWWWWWWWWW",
      "W......CCCC.W",
      "W......CCCC.W",
      "W...........W",
      "WBBBBBB.....W",
      "WBBBBBB.....W",
      "WBBBBBB.....W",
      "W...........W",
      "W...........W",
      "W...........W",
      "W...........W",
      "W...........W",
      "WWWWWWWWWDWWW"
    ],
    exits: [
      { x: 9, y: 12, target: "salon", dir: "down" }
    ],
    interactives: [
      { x: 7, y: 1, contains: "passport" }
    ]
  },

  sdb: {
    layout: [
      "WWWWWWWWWWWWW",
      "W...MM......W",
      "W...MM......W",
      "W...........W",
      "W.........LLW",
      "WHH.......LLW",
      "WHH.......LLW",
      "WHH.......LLW",
      "WHH.........W",
      "WHH.........W",
      "WHH.........W",
      "W...........W",
      "WWWWWWDWWWWW"
    ],
    exits: [
      { x: 6, y: 12, target: "salon", dir: "down" }
    ],
    interactives: []
  },

  outside: {
    layout: [
      "1111111111111",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1111112111111"
    ],
    exits: [
      { x: 6, y: 12, target: "couloir", dir: "down" }
    ],
    interactives: []
  }
};
