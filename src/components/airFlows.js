import AirFlow from "../core/AirFlow.js";
import {
    billowing_material, cloud3d_material,
    cloud_material,
    drop_material,
    flame_material, navigator_material,
    particle_material
} from "../core/shaderMaterials.js";
import { palette4, palette6 } from "../core/palettes.js";
import { DATA } from "../data/DATA.js";

function createAirFlow(world, settings) {
    const flow = new AirFlow(DATA.air_init(), settings);

    world.add(flow.mesh);
    world.registerUpdatable(flow);

    return flow;
}

export function initCloudStyleFlow(world) {
    const settings = { width: 0.14, material: cloud_material, palette: palette6 };
    return createAirFlow(world, settings);
}

export function initParticleStyleFlow(world) {
    const settings = { width: 0.26, material: particle_material, palette: palette4 };
    return createAirFlow(world, settings);
}

export function initFlameStyleFlow(world) {
    const settings = { width: 0.18, material: flame_material, palette: palette4 };
    return createAirFlow(world, settings);
}

export function initDropStyleFlow(world) {
    const settings = { width: 0.3, material: drop_material, palette: palette6 };
    return createAirFlow(world, settings);
}

export function initBillowingStyleFlow(world) {
    const settings = { width: 0.18, material: billowing_material, palette: palette6 };
    return createAirFlow(world, settings);
}

export function initNavigatorStyleFlow(world) {
    const settings = { width: 0.16, material: navigator_material, palette: palette6 };
    return createAirFlow(world, settings);
}

export function initCloud3dStyleFlow(world) {
    const settings = { width: 0.2, material: cloud3d_material, palette: palette6 };
    return createAirFlow(world, settings);
}
