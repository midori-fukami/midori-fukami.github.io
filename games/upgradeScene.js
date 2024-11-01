// upgradeScene.js

function upgradeScene({ candyCount, level, sanity, flashlight }) {
    // Add the same background as the game scene
    add([sprite("background"), scale(0.7)]);

    const candyCountText = add([
        text(`Candies: ${candyCount}`, 18),
        pos(20, 60),
        color(255, 255, 0),
    ]);

    add([
        text("Upgrade Menu", 24),
        pos(width() / 2, 20),
        anchor("center"),
        color(255, 255, 255),
    ]);

    // Define upgrade options
    const upgrades = [
        { 
            name: "Speed", 
            cost: UPGRADE_COSTS.speed, 
            upgrade: () => increasePlayerSpeed(20) 
        },
        { 
            name: "Power Duration", 
            cost: UPGRADE_COSTS.powerDuration, 
            upgrade: () => increasePowerupDuration(2) 
        },
        { 
            name: "Flashlight Size", 
            cost: UPGRADE_COSTS.flashlight, 
            upgrade: () => increaseFlashlightSize(10) 
        },
    ];

    upgrades.forEach((upgrade, index) => {
        add([
            text(`${index + 1}. ${upgrade.name} - Cost: ${upgrade.cost}`, 18),
            pos(20, 100 + index * 30),
            color(255, 255, 255),
        ]);
    });

    // Define upgrade purchase logic
    function attemptUpgrade(upgrade) {
        if (candyCount >= upgrade.cost) {
            candyCount -= upgrade.cost;
            upgrade.upgrade();
            play("powerup");
            add([
                text("Upgrade successful!", 16),
                pos(width() / 2, height() - 40),
                color(0, 255, 0),
                anchor("center"),
                lifespan(1)
            ]);
            // Update candy count display
            candyCountText.text = `Candies: ${candyCount}`;
        } else {
            add([
                text("Not enough candies!", 16),
                pos(width() / 2, height() - 40),
                color(255, 0, 0),
                anchor("center"),
                lifespan(1)
            ]);
        }
    }

    // Listen for key presses to buy upgrades
    onKeyPress("1", () => attemptUpgrade(upgrades[0]));
    onKeyPress("2", () => attemptUpgrade(upgrades[1]));
    onKeyPress("3", () => attemptUpgrade(upgrades[2]));

    // Proceed to the game scene after upgrading
    add([
        text("Press ENTER to continue", 18),
        pos(width() / 2, height() - 80),
        anchor("center"),
        color(255, 255, 255),
    ]);

    onKeyPress("enter", () => go("game", { level, sanity, candyCount, flashlight }));
}
