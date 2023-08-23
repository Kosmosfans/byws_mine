import { CylinderGeometry, InstancedMesh } from "three";
import { blink_material } from "./shaderMaterials.js";

export default function personnelMesh(count) {
    return new InstancedMesh(geom, blink_material, count);
}

const geom = (() => {
    const geom = new CylinderGeometry(0.02, 0.15, 0.86, 8, 1, true);

    geom.rotateY(-Math.PI / 2);
    geom.translate(0, 0.43, 0);

    return geom;
})();