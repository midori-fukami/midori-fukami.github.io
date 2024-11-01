const BASE_GHOST_SPEED = 3000;
const MAX_GHOSTS = 20;
const LEFT_MARGIN = 20;
const RIGHT_MARGIN = 40;
const TOP_MARGIN = 20;
const BOTTOM_MARGIN = 40;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 62;
const FLASHLIGHT_BATTERY = 100;
const GHOST_BASE_OPACITY = 0.5;
const FLASHLIGHT_BASE_OPACITY = 0.3;
const CRUCIFIX_SPAWN_CHANCE = 0.0005; // 0.05% chance per frame
const CRUCIFIX_DURATION = 5;
const EXORCISM_POINTS = 5; // Points gained for exorcising a ghost
const UPGRADE_COSTS = {
    speed: 5,          // Candies required for each upgrade
    powerDuration: 5,
    flashlight: 5,
};

let PLAYER_SPEED = 100;
let POWERUP_DURATION = 5;
let FLASHLIGHT_RADIUS = 50;