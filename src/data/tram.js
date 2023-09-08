import { clamp, outside, rand } from "../core/utils/utils.js";

let pct = 0, dir = 1;

export function tram_update() {
    const delta = rand() * 0.1 + 0.05;
    pct += delta * dir;

    if (!outside(pct, 0, 1)) return pct;

    dir *= -1;
    pct = clamp(pct, 0, 1);

    return pct;
}
