import AirFlow from "../core/AirFlow.js";
import { billowing_material, cloud_material, drop_material, navigator_material, } from "../core/shaderMaterials.js";
import palettes from "../core/palettes.js";
import { DATA } from "../data/DATA.js";

function createAirFlow(settings) {
    const data = DATA.air_init();
    return new AirFlow(data, settings);
}

export default function initAirFlow() {
    return initBillowingStyleFlow();
}

function initBillowingStyleFlow() {
    const materials = [billowing_material, cloud_material, drop_material, navigator_material];
    const settings = { width: 0.2, materials, palette: palettes.palette6 };
    return createAirFlow(settings);
}
