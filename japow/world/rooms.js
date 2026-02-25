export const ROOMS = {
  couloir: {
    spawn: { x: 64, y: 64 },
    exits: [
      { x: 6, y: 0, target: "chambre_haut", targetSpawn: { x: 64, y: 320 } },
      { x: 6, y: 12, target: "chambre_bas", targetSpawn: { x: 64, y: 64 } },
      { x: 12, y: 6, target: "salon", targetSpawn: { x: 32, y: 192 } },
      { x: 0, y: 6, target: "outside", targetSpawn: { x: 64, y: 160 } }
    ],
    interactives: [
      { x: 3, y: 5, id: "meuble_couloir", contains: "key", opened: false }
    ],
    layout: [
      "1111112111111",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1004000000001",
      "1000000000001",
      "2000000000002",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1111112111111"
    ]
  },

  salon: {
    spawn: { x: 160, y: 192 },
    exits: [
      { x: 0, y: 6, target: "couloir", targetSpawn: { x: 352, y: 192 } },
      { x: 6, y: 0, target: "sdb", targetSpawn: { x: 160, y: 320 } },
      { x: 10, y: 0, target: "chambre_3", targetSpawn: { x: 64, y: 160 } }
    ],
    interactives: [
      { x: 4, y: 4, id: "meuble_salon_a", contains: null, opened: false },
      { x: 8, y: 8, id: "meuble_salon_b", contains: null, opened: false }
    ],
    layout: [
      "1111112112111",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1000400000001",
      "1000000000001",
      "2000000000001",
      "1000000000001",
      "1000000040001",
      "1000000000001",
      "1000000000001",
      "1000000000001",
      "1111111111111"
    ]
  }
};
