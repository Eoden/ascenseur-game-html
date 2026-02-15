drawPlayer(player) {
    const img = this.assets.images.player;

    const frameWidth = 64;
    const frameHeight = 80;

    const frameX = player.frameIndex || 0;

    const hitboxOffsetX = (64 - player.width) / 2;
    const hitboxOffsetY = 80 - player.height;

    const screenX = player.x - hitboxOffsetX;
    const screenY = player.y - hitboxOffsetY;

    this.ctx.imageSmoothingEnabled = false;

    this.ctx.drawImage(
        img,
        frameX * frameWidth,
        0,
        frameWidth,
        frameHeight,
        Math.floor(screenX),
        Math.floor(screenY),
        frameWidth,
        frameHeight
    );
}
