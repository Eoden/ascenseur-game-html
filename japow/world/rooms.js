export const ROOMS = {
  couloir: {
    spawn: { x: 64, y: 64 },
    exits: [
      { x: 6, y: 1, target: "chambre_haut", targetSpawn: { x: 64, y: 320 } },
      { x: 6, y: 9, target: "chambre_bas", targetSpawn: { x: 64, y: 64 } },
      { x: 12, y: 5, target: "salon", targetSpawn: { x: 64, y: 160 } },
      { x: 0, y: 6, target: "outside", targetSpawn: { x: 64, y: 160 } }
    ],
    interactives: [
      { x: 3, y: 5, id: "meuble_couloir", contains: "key", opened: false }
    ],
    layout: [
      "1111111111111",
      "1000002000001",
      "1000000000001",
      "1000000000001",
      "1004000000001",
      "1000000000002",
      "2000000000001",
      "1000000000001",
      "1000000000001",
      "1000002000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ]
  },

  chambre_haut: {
    spawn: { x: 64, y: 64 },
    exits: [
      { x: 6, y: 9, target: "couloir", targetSpawn: { x: 64, y: 64 } }
    ],
    interactives: [
      { x: 4, y: 3, id: "meuble_ch1", contains: null, opened: false }
    ],
    layout: [
      "1111111111111",
      "1000000000001",
      "1000000000001",
      "1000040000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000002000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ]
  },

  chambre_bas: {
    spawn: { x: 64, y: 64 },
    exits: [
      { x: 6, y: 1, target: "couloir", targetSpawn: { x: 64, y: 256 } }
    ],
    interactives: [
      { x: 9, y: 4, id: "meuble_ch2_a", contains: null, opened: false },
      { x: 4, y: 7, id: "meuble_ch2_b", contains: null, opened: false }
    ],
    layout: [
      "1111111111111",
      "1000002000001",
      "1000000000001",
      "1000000000001",
      "1000000004001",
      "1000000000001",
      "1000000000001",
      "1000040000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ]
  },

  salon: {
    spawn: { x: 64, y: 160 },
    exits: [
      { x: 0, y: 6, target: "couloir", targetSpawn: { x: 320, y: 160 } },
      { x: 6, y: 1, target: "sdb", targetSpawn: { x: 64, y: 256 } },
      { x: 12, y: 3, target: "chambre_3", targetSpawn: { x: 64, y: 160 } }
    ],
    interactives: [
      { x: 4, y: 3, id: "meuble_salon_a", contains: null, opened: false },
      { x: 4, y: 9, id: "meuble_salon_b", contains: null, opened: false }
    ],
    layout: [
      "1111111111111",
      "1000002000001",
      "1000000000001",
      "2000040000002",
      "1000000000001",
      "1000000000001",
      "2000000000001",
      "1000000000001",
      "1000000000001",
      "1000040000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ]
  },

  sdb: {
    spawn: { x: 64, y: 64 },
    exits: [
      { x: 6, y: 9, target: "salon", targetSpawn: { x: 64, y: 64 } }
    ],
    interactives: [
      { x: 4, y: 3, id: "meuble_sdb", contains: null, opened: false }
    ],
    layout: [
      "1111111111111",
      "1000000000001",
      "1000000000001",
      "1000040000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000002000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ]
  },

  chambre_3: {
    spawn: { x: 64, y: 160 },
    exits: [
      { x: 0, y: 3, target: "salon", targetSpawn: { x: 320, y: 160 } }
    ],
    interactives: [
      { x: 4, y: 5, id: "meuble_ch3", contains: "passport", opened: false }
    ],
    layout: [
      "1111111111111",
      "1000000000001",
      "1000000000001",
      "2000000000001",
      "1000000000001",
      "1000040000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ]
  },

  outside: {
    spawn: { x: 64, y: 160 },
    exits: [],
    interactives: [],
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
      "1111111111111"
    ]
  }
};
