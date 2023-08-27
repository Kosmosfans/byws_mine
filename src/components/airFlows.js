import AirFlow from "../core/AirFlow.js";
import {
    billowing_material,
    cloud_material,
    drop_material, electro_material,
    flame_material,
    particle_material
} from "../core/shaderMaterials.js";
import { palette1, palette2, palette3, palette4, palette5, palette6, palette7 } from "../core/palettes.js";
import { data } from "../system/data.js";

function createAirFlow(world, settings) {
    const flow = new AirFlow(data.air_init(), settings);

    world.add(flow.mesh);
    world.registerUpdatable(flow);

    return flow;
}

export function initCloudStyleFlow(world) {
    const settings = { width: 0.1, material: cloud_material, palette: palette4 };
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

export function initElectroStyleFlow(world) {
    const settings = { width: 0.8, material: electro_material, palette: palette6 };
    return createAirFlow(world, settings);
}
