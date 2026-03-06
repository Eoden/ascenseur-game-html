import { OBJECTS } from '../world/objects.js';

export default class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.floorPierre = new Image();
    this.floorPierre.src = 'assets/sprites/levels/appart_pierre/floor.png';

    this.plantPierre = new Image();
    this.plantPierre.src = 'assets/sprites/levels/appart_pierre/plant.png';

    this.commodeHorizontal = new Image();
    this.commodeHorizontal.src = 'assets/sprites/levels/appart_pierre/commode_horizontal.png';

    this.commodeVertical = new Image();
    this.commodeVertical.src = 'assets/sprites/levels/appart_pierre/commode_vertical.png';

    this.tableBassePierre = new Image();
    this.tableBassePierre.src = 'assets/sprites/levels/appart_pierre/tableBasse.png';

    this.sprites = {};

    Object.values(OBJECTS).forEach(obj => {
      const name = obj.sprite;
      if (!this.sprites[name]) {
        const img = new Image();
        img.src = 'assets/sprites/levels/appart_pierre/' + name;
        this.sprites[name] = img;
      }
    });

    this.appartRooms = new Set([
      'salon','couloir','chambre1','chambre2','chambre3','sdb'
    ]);
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0,0,420,420);
  }

  render(game) {
    const ctx = this.ctx;
    const { map, player } = game;

    const size = map.tileSize;
    const currentRoom = game.currentRoom;

    // FLOOR
    for (let y=0;y<map.height;y++){
      for (let x=0;x<map.width;x++){
        const tile = map.tiles[y*map.width+x];
        if(tile!==1 && this.appartRooms.has(currentRoom)){
          if(this.floorPierre.complete){
            ctx.drawImage(this.floorPierre,x*size,y*size,size,size);
          }
        }
      }
    }

    // WALLS + DOORS
    for (let y=0;y<map.height;y++){
      for (let x=0;x<map.width;x++){
        const tile = map.tiles[y*map.width+x];

        if(tile===1){
          ctx.fillStyle='#333';
          ctx.fillRect(x*size,y*size,size,size);
        }

        else if(tile===2){
          ctx.fillStyle='gold';
          ctx.fillRect(x*size,y*size,size,size);
        }
      }
    }

    // PLANTS
    if(this.plantPierre.complete){
      for(let y=0;y<map.height;y++){
        for(let x=0;x<map.width;x++){
          if(map.tiles[y*map.width+x]===5){
            ctx.drawImage(this.plantPierre,x*size,y*size,size,size);
          }
        }
      }
    }

    // GENERIC OBJECT RENDERER
    for(let y=0;y<map.height;y++){
      for(let x=0;x<map.width;x++){

        const tile = map.tiles[y*map.width+x];
        const obj = OBJECTS[tile];

        if(!obj) continue;
        if(obj.rooms && !obj.rooms.includes(currentRoom)) continue;

        const left = x>0 && map.tiles[y*map.width+(x-1)]===tile;
        const up = y>0 && map.tiles[(y-1)*map.width+x]===tile;

        if(left || up) continue;

        const sprite = this.sprites[obj.sprite];
        if(!sprite || !sprite.complete) continue;

        let width = obj.width;
        let height = obj.height;

        if(obj.height === 'column'){
          height = 0;
          while(map.tiles[(y+height)*map.width+x] === tile){
            height++;
          }
          if(obj.trimBottom) height -= obj.trimBottom;
        }

        ctx.drawImage(
          sprite,
          x*size,
          y*size,
          width*size,
          height*size
        );
      }
    }

    // COMMODES
    for(let y=0;y<map.height;y++){
      for(let x=0;x<map.width;x++){
        const tile=map.tiles[y*map.width+x];
        if(tile!==3) continue;

        const right = map.tiles[y*map.width+(x+1)]===3;
        const down = map.tiles[(y+1)*map.width+x]===3;

        if(right && this.commodeHorizontal.complete){
          const leftEdge = x===0||map.tiles[y*map.width+(x-1)]!==3;
          if(leftEdge){
            ctx.drawImage(this.commodeHorizontal,x*size,y*size,2*size,1*size);
          }
        }

        else if(down && this.commodeVertical.complete){
          const topEdge = y===0||map.tiles[(y-1)*map.width+x]!==3;
          if(topEdge){
            ctx.drawImage(this.commodeVertical,x*size,y*size,1*size,2*size);
          }
        }
      }
    }

    // COFFEE TABLE
    if(currentRoom==='salon'){
      for(let y=0;y<map.height;y++){
        for(let x=0;x<map.width;x++){
          if(map.tiles[y*map.width+x]===9){

            const right = map.tiles[y*map.width+(x+1)]===9;
            const down  = map.tiles[(y+1)*map.width+x]===9;
            const up    = y>0 && map.tiles[(y-1)*map.width+x]===9;
            const left  = x>0 && map.tiles[y*map.width+(x-1)]===9;

            if(!right && !down && !left && !up && this.tableBassePierre.complete){
              ctx.drawImage(this.tableBassePierre,x*size,y*size,size,size);
            }
          }
        }
      }
    }

    const sprite=player.getCurrentSprite();

    if(sprite && sprite.complete){
      const visualWidth=48;
      const visualHeight=62;
      ctx.drawImage(sprite,player.x+(size-visualWidth)/2,player.y+size-visualHeight,visualWidth,visualHeight);
    }

    if(game.canInteract){
      const px = player.x + size + 10;
      const py = player.y - 25;

      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.beginPath();
      ctx.arc(px,py,12,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle = "#00ff00";
      ctx.beginPath();
      ctx.arc(px,py,10,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("A",px,py);
    }

    if(game.dialog){
      const canvasW=this.canvas?.width??420;
      const canvasH=this.canvas?.height??420;
      const pad=16;
      const boxH=80;
      const x=pad;
      const y=canvasH-boxH-pad;
      const w=canvasW-pad*2;
      const h=boxH;

      ctx.fillStyle='rgba(0,0,0,0.8)';
      ctx.fillRect(x,y,w,h);

      ctx.fillStyle='white';
      ctx.font='16px Arial';
      ctx.textBaseline='middle';
      ctx.fillText(game.dialog,x+16,y+h/2);
    }
  }
}
