import surveillance_locations from "../config/surveillance_locations.json" assert { type: 'JSON' };
import { rand, randInt, range } from "../core/utils/utils.js";

export function surveillance_init() {
    return surveillance_locations;
}

export function surveillance_update() {
    const indices = new Set(range(20).map(() => randInt(surveillance_locations.length)));
    return [...indices].map(rotationInfo);
}

function rotationInfo(i) {
    return { 'index': i, 'frames': 100 + randInt(200), 'dir': rand() > 0.5 ? 1 : -1 };
}