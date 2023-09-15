import paths from "../config/conveyor_paths.json" assert { type: "JSON" };
import ParticleFlow from "../core/ParticleFlow.js";

export default function initCoalFlow() {
    const settings = { 'particleCnt': 1800, 'tunnelWidth': 0.3, 'particleSize': 0.2 };
    return new ParticleFlow(paths, settings);
}