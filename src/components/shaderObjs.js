import ShaderObj from "../core/ShaderObj.js";
import { PlaneGeometry } from "three";
import { jet_material, smoke_material } from "../core/shaderMaterials.js";

export default function initShaderObjs(world) {
    const smoke = new ShaderObj(new PlaneGeometry(0.25, 2, 1, 64), smoke_material);
    smoke.mesh.position.set(2.32, 39.9, -11.83);

    world.add(smoke.mesh);
    world.registerUpdatable(smoke);

    const jet = new ShaderObj(new PlaneGeometry(0.5, 2.0, 1, 32), jet_material);
    jet.mesh.position.set(6.58, 34.5, -15.5);
    world.add(jet.mesh);
    world.registerUpdatable(jet);
}