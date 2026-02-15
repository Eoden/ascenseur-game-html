drawPlayer(player) {
    const img = this.assets.images.player;

    if (!img) return;

    const frameWidth = 64;
    const frameHeight = 80;
    const frameX = player.frameIndex || 0;

    this.ctx.imageSmoothingEnabled = false;

    this.ctx.drawImage(
        img,
        frameX * frameWidth,
        0,
        frameWidth,
        frameHeight,
        Math.floor(player.x),
        Math.floor(player.y - 16),
        frameWidth,
        frameHeight
    );
}
