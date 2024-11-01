// weather.js

let currentWeather = "clear";
let weatherIntensity = 0;
let weatherEffect = null;
let rainParticles = [];

function createWeatherEffect() {
    if (weatherEffect) {
        destroy(weatherEffect);
    }

    if (currentWeather === "fog") {
        weatherEffect = add([
            rect(width(), height()),
            color(200, 200, 200),
            opacity(0),
            fixed(),
            z(100),
            "weatherEffect"
        ]);
    } else if (currentWeather === "rain") {
        weatherEffect = add([
            rect(width(), height()),
            color(0, 0, 200),
            opacity(0),
            fixed(),
            z(100),
            "weatherEffect"
        ]);
        createRainParticles();
    }
}

function createRainParticles() {
    rainParticles = [];
    for (let i = 0; i < 100; i++) {
        rainParticles.push(add([
            rect(2, 10),
            pos(rand(0, width()), rand(-100, height())),
            color(100, 100, 255),
            opacity(0.7),
            "rainDrop"
        ]));
    }
}

function updateWeather() {
    if (rand(0, 1000) < 5) { // 0.5% chance to change weather each frame
        currentWeather = choose(["clear", "fog", "rain"]);
        weatherIntensity = rand(0.2, 0.6);
        createWeatherEffect();
    }

    if (weatherEffect) {
        weatherEffect.opacity = weatherIntensity * 0.5;
    }

    if (currentWeather === "rain") {
        updateRainParticles();
    }
}

function updateRainParticles() {
    rainParticles.forEach(drop => {
        drop.move(0, 6000 * dt());
        if (drop.pos.y > height()) {
            drop.pos.y = -10;
            drop.pos.x = rand(0, width());
        }
    });
}

function getVisibilityFactor() {
    if (currentWeather === "clear") return 1;
    return 1 - (weatherIntensity * 0.3);
}

function getGhostSpeedFactor() {
    if (currentWeather === "rain") return 1 - (weatherIntensity * 0.3);
    return 1;
}

function getDifficultyFactor() {
    if (currentWeather === "fog") return 1 + (weatherIntensity * 0.2); // Slightly harder in fog
    if (currentWeather === "rain") return 1 - (weatherIntensity * 0.1); // Slightly easier in rain
    return 1;
}

function clearWeather() {
    if (weatherEffect) {
        destroy(weatherEffect);
        weatherEffect = null;
    }
    rainParticles.forEach(drop => destroy(drop));
    rainParticles = [];
    currentWeather = "clear";
    weatherIntensity = 0;
}
