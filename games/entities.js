const POWERUP_TYPES = ["speed", "invincibility", "repellent", "magnet"];

function spawnCandy(level) {
    add([
        sprite("candy"),
        pos(rand(LEFT_MARGIN, width() - RIGHT_MARGIN), rand(TOP_MARGIN, height() - BOTTOM_MARGIN)),
        area(),
        "candy"
    ]);
}

function spawnPumpkin(level) {
    add([
        sprite("pumpkin"),
        pos(rand(LEFT_MARGIN, width() - RIGHT_MARGIN), rand(TOP_MARGIN, height() - BOTTOM_MARGIN)),
        area(),
        "pumpkin"
    ]);
}

function spawnGhost(level, player) {
    if (get("ghost").length < MAX_GHOSTS) {
        const baseGhostSpeed = BASE_GHOST_SPEED + (level * 50);
        const ghost = add([
            sprite("ghost"),
            pos(rand(LEFT_MARGIN, width() - RIGHT_MARGIN), rand(TOP_MARGIN, height() - BOTTOM_MARGIN)),
            area(),
            opacity(GHOST_BASE_OPACITY),
            "ghost",
            {
                baseSpeed: rand(baseGhostSpeed * 0.8, baseGhostSpeed * 1.2),
                stunned: false,
                stunTime: 0
            },
        ]);

        ghost.onUpdate(() => {
            if (ghost.stunTime > 0) {
                ghost.stunTime -= dt();
                if (ghost.stunTime <= 0) {
                    ghost.stunned = false;
                    ghost.opacity = GHOST_BASE_OPACITY * getVisibilityFactor();
                }
            }

            if (!ghost.stunned) {
                const speedFactor = getGhostSpeedFactor() * getDifficultyFactor();
                const currentSpeed = ghost.baseSpeed * speedFactor;
                const dir = player.pos.sub(ghost.pos).unit();
                ghost.move(dir.scale(currentSpeed * dt()));
            }
        });
    }
    
    // Schedule next ghost spawn
    wait(rand(2, 4) / level, () => spawnGhost(level, player));
}

function spawnPowerUp() {
    const type = choose(POWERUP_TYPES);
    add([
        sprite("powerup"),
        pos(rand(LEFT_MARGIN, width() - RIGHT_MARGIN), rand(TOP_MARGIN, height() - BOTTOM_MARGIN)),
        area(),
        "powerup",
        { type: type }
    ]);
    wait(rand(15, 20), spawnPowerUp);
}

function spawnCrucifix() {
    add([
        sprite("crucifix"), // Make sure to add a crucifix sprite to your assets
        pos(rand(LEFT_MARGIN, width() - RIGHT_MARGIN), rand(TOP_MARGIN, height() - BOTTOM_MARGIN)),
        area(),
        "crucifix"
    ]);
}