import { DATA } from "../data/DATA.js";
import { rand } from "../core/utils/utils.js";

// ----- realtime DATA simulator ------

const generators = [
    { func: 'air_update',          elapsed: 0, interval: 0.53, min: 0.45, max: 0.53 },
    { func: 'personnel_update',    elapsed: 0, interval: 0.95, min: 0.80, max: 0.95 },
    { func: 'conveyor_update',     elapsed: 0, interval: 2.40, min: 0.50, max: 2.40 },
    { func: 'tram_update',         elapsed: 0, interval: 4.40, min: 4.10, max: 4.40 },
    { func: 'seismic_update',      elapsed: 0, interval: 1.00, min: 0.50, max: 1.50 },
    { func: 'surveillance_update', elapsed: 0, interval: 2.22, min: 1.57, max: 2.29 },
    { func: 'monitor_update',      elapsed: 0, interval: 1.40, min: 1.25, max: 1.80 },
];

const triggers = {
    tick: delta => generators.forEach(g => dataGeneratorTick(g, delta))
}

function dataGeneratorTick(generator, delta) {
    generator.elapsed += delta;
    if (generator.elapsed < generator.interval) return;

    generate(generator.func);

    generator.elapsed -= generator.interval;
    generator.interval = rand(generator.min, generator.max);
}

function generate(func) {
    const d = { 'data': DATA[func]() };
    document.dispatchEvent(new CustomEvent(func, { detail: d }));
}

export default function initTriggers(world) {
    world.registerUpdatable(triggers);
}

