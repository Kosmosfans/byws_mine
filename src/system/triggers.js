import { data } from "./data.js";

const targets = [
    { type: 'air_update', elapsed: 0, interval: 0.53 },
    { type: 'personnel_update', elapsed: 0, interval: 0.451 },
];

class Triggers {
    tick(delta) {
        targets.forEach(target => targetTick(target, delta));
    }
}

function targetTick(target, delta) {
    target.elapsed += delta;
    if (target.elapsed < target.interval) return;

    fireEvent(target.type);
    target.elapsed -= target.interval;
}

function fireEvent(type) {
    const event = new CustomEvent(type, { detail: { 'data': data[type]() } });
    document.dispatchEvent(event);
}

export default function initTriggers(world) {
    world.registerUpdatable(new Triggers());
}

