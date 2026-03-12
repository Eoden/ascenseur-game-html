export default class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.floorPierre = new Image();
    this.floorPierre.src = 'assets/sprites/levels/appart_pierre/floor.png';

    this.canapePierre = new Image();
    this.canapePierre.src = 'assets/sprites/levels/appart_pierre/canape.png';

    this.plantPierre = new Image();
    this.plantPierre.src = 'assets/sprites/levels/appart_pierre/plant.png';

    this.bedPierre = new Image();
    this.bedPierre.src = 'assets/sprites/levels/appart_pierre/bed.png';

    this.commodeHorizontal = new Image();
    this.commodeHorizontal.src = 'assets/sprites/levels/appart_pierre/commode_horizontal.png';

    this.commodeVertical = new Image();
    this.commodeVertical.src = 'assets/sprites/levels/appart_pierre/commode_vertical.png';

    this.tablePierre = new Image();
    this.tablePierre.src = 'assets/sprites/levels/appart_pierre/table.png';

    this.tableBassePierre = new Image();
    this.tableBassePierre.src = 'assets/sprites/levels/appart_pierre/tableBasse.png';

    this.cuisinePierre = new Image();
    this.cuisinePierre.src = 'assets/sprites/levels/appart_pierre/cuisine.png';

    this.canapeTilesWide = 4;
    this.canapeTilesHigh = 4;

    this.tableTilesWide = 2;
    this.tableTilesHigh = 3;

    this.appartRooms = new Set([
      'salon','couloir','chambre1','chambre2','chambre3','sdb'
    ]);
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0,0,420,420);
  }

  render(game) {
    const { ctx } = this;
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

    // CUISINE (single sprite for vertical block of 8)
    if(currentRoom==='salon' && this.cuisinePierre.complete){
      for(let y=0;y<map.height;y++){
        for(let x=0;x<map.width;x++){

          if(map.tiles[y*map.width+x]!==8) continue;

          const top = y===0 || map.tiles[(y-1)*map.width+x]!==8;
          if(!top) continue;

          let heightTiles = 1;
          let yy = y+1;

          while(yy < map.height && map.tiles[yy*map.width+x]===8){
            heightTiles++;
            yy++;
          }

          ctx.drawImage(
            this.cuisinePierre,
            x*size,
            y*size,
            size,
            heightTiles*size
          );
        }
      }
    }

    // BEDS (generic multi-tile detection)
    if(this.bedPierre.complete && currentRoom!=='salon'){
      for(let y=0;y<map.height;y++){
        for(let x=0;x<map.width;x++){

          if(map.tiles[y*map.width+x]!==4) continue;

          const left = x===0 || map.tiles[y*map.width+(x-1)]!==4;
          const top  = y===0 || map.tiles[(y-1)*map.width+x]!==4;

          if(!(left && top)) continue;

          // detect width
          let width=1;
          while(x+width < map.width && map.tiles[y*map.width+(x+width)]===4){
            width++;
          }

          // detect height
          let height=1;
          while(y+height < map.height && map.tiles[(y+height)*map.width+x]===4){
            height++;
          }

          ctx.drawImage(
            this.bedPierre,
            x*size,
            y*size,
            width*size,
            height*size
          );
        }
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

    // TABLE + COFFEE TABLE
    if(currentRoom==='salon'){
      for(let y=0;y<map.height;y++){
        for(let x=0;x<map.width;x++){
          if(map.tiles[y*map.width+x]===9){

            const right = map.tiles[y*map.width+(x+1)]===9;
            const down  = map.tiles[(y+1)*map.width+x]===9;
            const up    = y>0 && map.tiles[(y-1)*map.width+x]===9;
            const left  = x>0 && map.tiles[y*map.width+(x-1)]===9;

            const leftEdge = !left;
            const topEdge  = !up;

            if(right && down && leftEdge && topEdge && this.tablePierre.complete){
              ctx.drawImage(
                this.tablePierre,
                x*size,
                y*size,
                this.tableTilesWide*size,
                this.tableTilesHigh*size
              );
            }

            else if(!right && !down && !left && !up && this.tableBassePierre.complete){
              ctx.drawImage(
                this.tableBassePierre,
                x*size,
                y*size,
                size,
                size
              );
            }
          }
        }
      }
    }

    // SOFA
    if(currentRoom==='salon' && this.canapePierre.complete){
      for(let y=0;y<map.height;y++){
        for(let x=0;x<map.width;x++){
          if(map.tiles[y*map.width+x]===6){
            const left=x===0||map.tiles[y*map.width+(x-1)]!==6;
            const top=y===0||map.tiles[(y-1)*map.width+x]!==6;
            if(left&&top){
              ctx.drawImage(this.canapePierre,x*size,y*size,this.canapeTilesWide*size,this.canapeTilesHigh*size);
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
      ctx.textAlign='center';
      ctx.textBaseline='middle';

      ctx.fillText(game.dialog, x + w/2, y + h/2);
    }
  }
}
