function gameOverScene(gameState) {
    const { score, level } = gameState;

    add([
        sprite("startBackground"),
        scale(1),
    ]);

    add([
        text(`Game Over!\nScore: ${score}\nLevel: ${level}\nPress escape to restart`, 24),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(255, 0, 0),
    ]);

    onKeyPress("escape", () => {
        go("menu");
    });
}
