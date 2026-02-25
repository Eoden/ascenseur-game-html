export default class Enemy {
  constructor(x, y, config = {}) {
    this.x = x;
    this.y = y;
    this.size = 32;

    this.speed = config.speed || 1;
    this.behavior = config.behavior || "idle";

    this.patrolPoints = config.patrolPoints || [];
    this.currentPatrolIndex = 0;

    this.visionLength = config.visionLength || 4;
    this.direction = "right";
  }

  update(game) {
    if (this.behavior === "patrol_detection") {
      this.patrol(game);
    }
  }

  patrol(game) {
    if (this.patrolPoints.length === 0) return;

    const target = this.patrolPoints[this.currentPatrolIndex];

    const dx = target.x - this.x;
    const dy = target.y - this.y;

    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      this.direction = dx > 0 ? "right" : "left";
      this.x += dx > 0 ? this.speed : -this.speed;
    } else {
      this.direction = dy > 0 ? "down" : "up";
      this.y += dy > 0 ? this.speed : -this.speed;
    }
  }

  detectPlayer(player, tileSize) {
    const enemyTileX = Math.floor(this.x / tileSize);
    const enemyTileY = Math.floor(this.y / tileSize);

    const playerTileX = Math.floor(player.x / tileSize);
    const playerTileY = Math.floor(player.y / tileSize);

    if (this.direction === "right" && playerTileY === enemyTileY && playerTileX > enemyTileX && playerTileX <= enemyTileX + this.visionLength) return true;
    if (this.direction === "left" && playerTileY === enemyTileY && playerTileX < enemyTileX && playerTileX >= enemyTileX - this.visionLength) return true;
    if (this.direction === "down" && playerTileX === enemyTileX && playerTileY > enemyTileY && playerTileY <= enemyTileY + this.visionLength) return true;
    if (this.direction === "up" && playerTileX === enemyTileX && playerTileY < enemyTileY && playerTileY >= enemyTileY - this.visionLength) return true;

    return false;
  }
}
