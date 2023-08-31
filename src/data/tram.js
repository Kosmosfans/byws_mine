import { clamp, outside, rand } from "../core/utils/utils.js";

let prop = 0, dir = 1;

export function tram_update() {
    const delta = rand() * 0.1 + 0.05;
    prop += delta * dir;

    if (!outside(prop, 0, 1)) return prop;

    dir *= -1;
    prop = clamp(prop, 0, 1);

    return prop;
}
