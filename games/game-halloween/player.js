// player.js

function createPlayer() {
    return add([
        sprite("playerLeft"), // Start with left-facing sprite
        pos(width() / 2, height() / 2),
        area({ width: PLAYER_WIDTH, height: PLAYER_HEIGHT }),
        {
            speed: PLAYER_SPEED,
            powerUpActive: false,
            facingRight: false // New property to track facing direction
        },
        "player"
    ]);
}

function movePlayer(player) {
    const moveSpeed = player.speed * dt();
    let moved = false;

    if (isKeyDown("left") || isKeyDown("a")) {
        player.pos.x = Math.max(player.pos.x - moveSpeed, LEFT_MARGIN);
        if (player.facingRight) {
            player.use(sprite("playerLeft"));
            player.facingRight = false;
        }
        moved = true;
    }
    if (isKeyDown("right") || isKeyDown("d")) {
        player.pos.x = Math.min(player.pos.x + moveSpeed, width() - RIGHT_MARGIN - PLAYER_WIDTH);
        if (!player.facingRight) {
            player.use(sprite("playerRight"));
            player.facingRight = true;
        }
        moved = true;
    }
    if (isKeyDown("up") || isKeyDown("w")) {
        player.pos.y = Math.max(player.pos.y - moveSpeed, TOP_MARGIN);
        moved = true;
    }
    if (isKeyDown("down") || isKeyDown("s")) {
        player.pos.y = Math.min(player.pos.y + moveSpeed, height() - BOTTOM_MARGIN - PLAYER_HEIGHT);
        moved = true;
    }

    // If the player didn't move but was previously facing right, switch to left
    if (!moved && player.facingRight) {
        player.use(sprite("playerLeft"));
        player.facingRight = false;
    }
}
