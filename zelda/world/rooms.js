export const rooms = [
  { id: 0, walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}], exit:{x:4,y:0}, enemy:null },
  { id: 1, walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}], exit:{x:4,y:0}, enemy:{x:5,y:4,alive:true,dir:1} },
  { id: 2, walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}], exit:null, enemy:{x:5,y:4,alive:true,dir:-1} }
];