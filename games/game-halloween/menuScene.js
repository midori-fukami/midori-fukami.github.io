function menuScene() {
    add([
        sprite("startBackground"),
        scale(0.7)
    ]);

    add([
        text("Halloween Horror", 48),
        pos(width() / 2, height() / 4),
        anchor("center"),
        color(255, 0, 0),
    ]);

    add([
        text("Press SPACE to start", 24),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(255, 255, 255),
    ]);

    onKeyPress("space", () => {
        go("game", { level: 1, sanity: 100, candyCount: 0 });
    });
}
