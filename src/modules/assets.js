import ShaderObj from "../core/ShaderObj.js";
import { PlaneGeometry } from "three";
import { jet_material, smoke_material } from "../core/shaderMaterials.js";
import scenarios from "../system/scenarios.js";

export default function initAssets(world) {
    const smoke = new ShaderObj(new PlaneGeometry(0.25, 2, 1, 64), smoke_material);
    smoke.mesh.name = 'smoke';
    smoke.mesh.position.set(2.32, 39.9, -11.83);
    scenarios.addMesh('tunnel', smoke.mesh);
    world.registerUpdatable(smoke);

    const jet = new ShaderObj(new PlaneGeometry(0.5, 2.0, 1, 32), jet_material);
    jet.mesh.name = 'jet';
    jet.mesh.position.set(6.58, 34.5, -15.5);
    scenarios.addMesh('tunnel', jet.mesh);
    world.registerUpdatable(jet);
}