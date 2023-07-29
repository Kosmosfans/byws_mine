import tunnel_raw from '/src/data/tunnels.json' assert { type: 'JSON' };
import { rand, randInt, range } from "../core/utils/utils.js";

const count = Object.keys(tunnel_raw).length;

function generate(partial = true) {
    const total = partial ? 1 + randInt(10) : count;
    const off = partial ? randInt(count - 11) : 0;

    return range(total).map(i => item(i, off));
}

function item(i, off) {
    // normalized speed of each tunnel
    const speed = rand();

    const warning = rand() > 0.8;
    const inactive = rand() > 0.8;

    const item = {};
    item.index = i + off;
    item.speed = speed;
    item.inactive = inactive;
    item.warning = warning;

    return item;
}

export function airInit() {
    return generate(false);
}

export function airUpdate() {
    return generate(true);
}