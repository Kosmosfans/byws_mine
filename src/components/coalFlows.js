import paths from "../data/conveyor_paths.json" assert { type: 'JSON' };
import ParticleFlow from "../core/ParticleFlow.js";

export default function initCoalFlow(world) {
    const settings = { 'particleCnt': 1800, 'tunnelWidth': 0.3, 'particleSize': 0.2 };
    const flow = new ParticleFlow(paths, settings);

    world.add(flow.mesh);
    world.registerUpdatable(flow);

    return flow;
}