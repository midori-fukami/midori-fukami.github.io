kaboom({
    global: true,
    width: 716,
    height: 716,
    scale: 1,
    debug: true,
});

// Load assets
loadAssets();

// Define scenes
scene("menu", menuScene);
scene("game", gameScene);
scene("upgradeScene", upgradeScene);
scene("gameOver", gameOverScene);

// Start with the menu scene
go("menu");
