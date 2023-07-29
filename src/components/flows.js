import AirFlow from "../core/AirFlow.js";
import { cloud_material, particle_material } from "../core/shaderMaterials.js";
import { Colors } from "../core/Colors.js";
import { data } from "../system/data.js";

function createAirFlow(world, settings) {
    const flow = new AirFlow(data.air_init(), settings);

    world.add(flow.mesh);
    world.registerUpdatable(flow);
}

export function initCloudStyleFlow(world) {
    const settings = { width: 0.1, material: cloud_material, scheme: Colors.SCHEME1 };
    createAirFlow(world, settings);
}

export function initParticleStyleFlow(world) {
    const settings = { width: 0.17, material: particle_material, scheme: Colors.SCHEME2 };
    createAirFlow(world, settings);
}