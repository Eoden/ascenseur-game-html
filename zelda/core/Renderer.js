export default class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    render(game) {
        if (!game) return;

        const ctx = this.ctx;
        const map = game.map;
        if (!map) return;

        // Clear screen
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

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

        // Draw player (fallback simple block for now)
        ctx.fillStyle = "red";
        ctx.fillRect(game.player.x, game.player.y, 32, 32);
    }
}