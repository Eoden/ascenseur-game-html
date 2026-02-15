class Assets {
    constructor() {
        this.images = {};
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }

    loadAll() {
        // Corrected path (no double zelda/)
        this.images.player = this.loadImage("assets/sprites/player_64x80.png");
    }
}

export default Assets;
