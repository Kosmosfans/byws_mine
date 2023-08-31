import tunnel_raw from '/src/cfg/tunnels.json' assert { type: 'JSON' };
import { rand, randInt, range } from "../core/utils/utils.js";

const count = Object.keys(tunnel_raw).length;

function generate(partial = true) {
    const total = partial ? 1 + randInt(10) : count;
    const offset = partial ? randInt(count - 11) : 0;

    return range(total).map(i => item(i, offset));
}

function item(i, offset) {
    // normalized speed of each tunnel
    const speed = rand();

    const warning = rand() > 0.8;
    const inactive = rand() > 0.8;

    const item = {};
    item.index = i + offset;
    item.speed = speed;
    item.inactive = inactive;
    item.warning = warning;

    return item;
}

export function air_init() {
    return generate(false);
}

export function air_update() {
    return generate(true);
}