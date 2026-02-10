export const rooms = [
  {
    id: 0,
    theme: 'entry',
    walls: [
      { x: 0, y: 0, w: 10, h: 1 },
      { x: 0, y: 0, w: 1, h: 10 },
      { x: 9, y: 0, w: 1, h: 10 },
      { x: 0, y: 9, w: 10, h: 1 }
    ],
    exitTop: true,
    switch: null,
    enemy: null,
    item: null
  },
  {
    id: 1,
    theme: 'puzzle',
    walls: [
      { x: 0, y: 0, w: 10, h: 1 },
      { x: 0, y: 0, w: 1, h: 10 },
      { x: 9, y: 0, w: 1, h: 10 },
      { x: 0, y: 9, w: 10, h: 1 }
    ],
    exitTop: false,
    switch: { x: 5, y: 5, active: false },
    enemy: null,
    item: null
  },
  {
    id: 2,
    theme: 'combat',
    walls: [
      { x: 0, y: 0, w: 10, h: 1 },
      { x: 0, y: 0, w: 1, h: 10 },
      { x: 9, y: 0, w: 1, h: 10 },
      { x: 0, y: 9, w: 10, h: 1 }
    ],
    exitTop: false,
    switch: null,
    enemy: { x: 5, y: 4, alive: true, hp: 1 },
    item: { type: 'key', x: 5, y: 6, collected: false }
  }
];