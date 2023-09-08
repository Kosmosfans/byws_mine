import { rand, randInt, range } from "../core/utils/utils.js";
import { sampleTunnel } from "../core/utils/sampler.js";
import { Color } from "three";

const cfg = {
    count: 800,
    color1: new Color(0.2, 0.9, 0.2),
    color2: new Color(0.9, 0.9, 0.2),
    color3: new Color(0.9, 0.2, 0.2)
}

export function monitor_init() {
    const result = [];
    range(cfg.count).forEach(() => result.push(createSensorBySample()));
    return result;
}

function createSensorBySample() {
    const pos = sampleTunnel().position;
    return { 'x': pos.x, 'y': pos.y + 0.2, 'z': pos.z, 'type': randInt(5), 'color': cfg.color1 };
}

export function monitor_update() {
    return range(50).map(sensorStatus);
}

function sensorStatus() {
    const index = randInt(cfg.count);
    const color = rand() > 0.2 ? cfg.color1 : cfg.color3;
    return { index, color };
}