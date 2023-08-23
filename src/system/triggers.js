import { data } from "./data.js";

// ----- realtime data simulator ------

const generators = [
    { type: 'air_update', elapsed: 0, interval: 0.53 },
    { type: 'personnel_update', elapsed: 0, interval: 0.951 },
    { type: 'conveyor_update', elapsed: 0, interval: 2.4},
    { type: 'tram_update', elapsed: 0, interval: 4.4},
];

class Triggers {
    tick = (delta) => generators.forEach(target => dataGeneratorTick(target, delta));
}

function dataGeneratorTick(generator, delta) {
    generator.elapsed += delta;
    if (generator.elapsed < generator.interval) return;

    genData(generator.type);
    generator.elapsed -= generator.interval;
}

function genData(type) {
    const d = { 'data': data[type]() };
    document.dispatchEvent(new CustomEvent(type, { detail: d }));
}

export default function initTriggers(world) {
    world.registerUpdatable(new Triggers());
}

