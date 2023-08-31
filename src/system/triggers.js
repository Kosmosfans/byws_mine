import { DATA } from "../data/DATA.js";
import { randRange } from "../core/utils/utils.js";

// ----- realtime DATA simulator ------

const generators = [
    { func: DATA.air_update,            elapsed: 0, interval: 0.53,   min: 0.45,  max: 0.53 },
    { func: DATA.personnel_update,      elapsed: 0, interval: 0.95,   min: 0.80,  max: 0.95 },
    { func: DATA.conveyor_update,       elapsed: 0, interval: 2.40,   min: 0.50,  max: 2.40 },
    { func: DATA.tram_update,           elapsed: 0, interval: 4.40,   min: 4.10,  max: 4.40 },
    { func: DATA.seismic_update,        elapsed: 0, interval: 1.00,   min: 0.50,  max: 1.50 },
    { func: DATA.surveillance_update,   elapsed: 0, interval: 2.22,   min: 1.57,  max: 2.29 },
];

class Triggers {
    tick = (delta) => generators.forEach(g => dataGeneratorTick(g, delta));
}

function dataGeneratorTick(generator, delta) {
    generator.elapsed += delta;
    if (generator.elapsed < generator.interval) return;

    generate(generator.func);

    generator.elapsed -= generator.interval;
    generator.interval = randRange(generator.min, generator.max);
}

function generate(func) {
    const d = { 'data': func.call() };
    document.dispatchEvent(new CustomEvent(func.name, { detail: d }));
}

export default function initTriggers(world) {
    world.registerUpdatable(new Triggers());
}

