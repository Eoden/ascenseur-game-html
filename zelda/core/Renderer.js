export default class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    clear() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(game) {
        if (!game) return;

        const ctx = this.ctx;
        const map = game.map;
        if (!map) return;

        const tileSize = map.tileSize;

        // Draw map
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tile = map.tiles[y * map.width + x];

                if (tile === 1) {
                    ctx.fillStyle = "#444"; // wall
                } else if (tile === 2) {
                    ctx.fillStyle = "#0f0"; // exit
                } else {
                    ctx.fillStyle = "#111"; // floor
                }

                ctx.fillRect(
                    x * tileSize,
                    y * tileSize,
                    tileSize,
                    tileSize
                );
            }
        }

        // Draw player with HD sprite scaled to 64x82
        const player = game.player;

        if (player.sprite && player.sprite.complete) {
            const renderWidth = 64;
            const renderHeight = 82;

            // Center horizontally on 32px hitbox and align feet to ground
            const drawX = player.x - renderWidth / 2 + 16;
            const drawY = player.y - renderHeight + 32;

            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(
                player.sprite,
                drawX,
                drawY,
                renderWidth,
                renderHeight
            );
        } else {
            ctx.fillStyle = "red";
            ctx.fillRect(player.x, player.y, 32, 32);
        }
    }
}
