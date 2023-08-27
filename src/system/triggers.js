import { data } from "./data.js";
import { randRange } from "../core/utils/utils.js";

// ----- realtime data simulator ------

const generators = [
    { type: 'air_update',       elapsed: 0, interval: 0.53,   min: 0.45, max: 0.53 },
    { type: 'personnel_update', elapsed: 0, interval: 0.951,  min: 0.8,  max: 0.951 },
    { type: 'conveyor_update',  elapsed: 0, interval: 2.4,    min: 0.5,  max: 2.4 },
    { type: 'tram_update',      elapsed: 0, interval: 4.4,    min: 4.1,  max: 4.4 },
    { type: 'seismic_update',   elapsed: 0, interval: 1.0,    min: 0.5,  max: 1.5 },
];

class Triggers {
    tick = (delta) => generators.forEach(target => dataGeneratorTick(target, delta));
}

function dataGeneratorTick(generator, delta) {
    generator.elapsed += delta;
    if (generator.elapsed < generator.interval) return;

    genData(generator.type);

    generator.elapsed -= generator.interval;
    generator.interval = randRange(generator.min, generator.max);
}

function genData(type) {
    const d = { 'data': data[type]() };
    document.dispatchEvent(new CustomEvent(type, { detail: d }));
}

export default function initTriggers(world) {
    world.registerUpdatable(new Triggers());
}

