import { Mesh } from "three";
import { highlight_material } from "../core/shaderMaterials.js";

let masks;
export default class Highlight {
    setHighlightable(meshes) {
        masks = new Map();
        meshes.forEach((m) => createMask(m));
    }

    setTarget(target) {
        masks.get(target.name).visible = true;
    }

    clear(currentPick) {
        masks.get(currentPick.name).visible = false;
    }
}

function createMask(mesh) {
    const mask = new Mesh(mesh.geometry, highlight_material);
    mask.visible = false;
    mesh.add(mask);
    masks.set(mesh.name, mask);
}
