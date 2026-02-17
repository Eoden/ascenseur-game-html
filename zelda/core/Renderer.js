export default class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.ctx.imageSmoothingEnabled = false;

        this.camera = { x: 0, y: 0 };
    }

    setCamera(x, y) {
        this.camera.x = x;
        this.camera.y = y;
    }

    clear() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(game) {
        const tileSize = 32;

        // --- Draw map ---
        const map = game.world?.map;
        if (map) {
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    const tile = map[y][x];

                    const screenX = x * tileSize - this.camera.x;
                    const screenY = y * tileSize - this.camera.y;

                    if (tile === 1) {
                        this.ctx.fillStyle = "#444"; // wall
                    } else if (tile === 2) {
                        this.ctx.fillStyle = "#2ecc71"; // exit
                    } else {
                        this.ctx.fillStyle = "#222"; // floor
                    }

                    this.ctx.fillRect(screenX, screenY, tileSize, tileSize);
                }
            }
        }

        // --- Draw player ---
        const player = game.player;

        if (player?.sprite && player.sprite.complete) {
            this.ctx.drawImage(
                player.sprite,
                player.x - this.camera.x,
                player.y - this.camera.y,
                64,
                82
            );
        } else if (player) {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(
                player.x - this.camera.x,
                player.y - this.camera.y,
                32,
                32
            );
        }
    }
}
