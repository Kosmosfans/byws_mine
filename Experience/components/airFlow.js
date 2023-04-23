import airGraph from '/public/data/air.json' assert { type: 'JSON' };
import coalGraph from '/public/data/coal.json' assert { type: 'JSON' };
import colors from '/public/data/colors.json' assert { type: 'JSON' };
import ParticleFlow from "../core/ParticleFlow.js";

function createAirFlow() {
    const settings = { colorTable: colors.colorTable0, particleSize: 0.1, particleCnt: 9000 };
    return new ParticleFlow(airGraph, settings);
}

function createCoalFlow() {
    const settings = { colorTable: colors.colorTable3, particleSize: 0.2, particleCnt: 8000 };
    return new ParticleFlow(coalGraph, settings);
}

export { createCoalFlow, createAirFlow };