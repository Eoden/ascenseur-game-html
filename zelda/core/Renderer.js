export default class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // Pixel perfect rendering
        this.ctx.imageSmoothingEnabled = false;

        this.camera = { x: 0, y: 0 };
    }

    setCamera(x, y) {
        this.camera.x = x;
        this.camera.y = y;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw any sprite scaled into a logical 64x82 box
     * Supports HD sprite sheets
     */
    drawSprite(options) {
        const {
            image,
            sx = 0,
            sy = 0,
            sw = image.width,
            sh = image.height,
            dx,
            dy,
            targetWidth = 64,
            targetHeight = 82,
            flip = false
        } = options;

        const screenX = Math.floor(dx - this.camera.x);
        const screenY = Math.floor(dy - this.camera.y);

        this.ctx.save();

        if (flip) {
            this.ctx.translate(screenX + targetWidth, screenY);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(
                image,
                sx,
                sy,
                sw,
                sh,
                0,
                0,
                targetWidth,
                targetHeight
            );
        } else {
            this.ctx.drawImage(
                image,
                sx,
                sy,
                sw,
                sh,
                screenX,
                screenY,
                targetWidth,
                targetHeight
            );
        }

        this.ctx.restore();
    }
}
