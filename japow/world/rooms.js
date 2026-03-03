// Minimal room definition restored to the format expected by japow/core/Game.js
// (export named ROOMS with layout/exits/interactives).
// Other rooms will be restored in a later patch.

export const ROOMS = {
  salon: {
    // 13x13 matrix (strings), tile legend handled by Renderer
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

    // Temporarily empty (we are fixing the ROOMS export crash first)
    exits: [],
    interactives: []
  }
};
