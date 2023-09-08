import { Mesh } from "three";
import { highlight_material } from "./shaderMaterials.js";
import { deleteObject3D } from "./utils/utils.js";

let _mesh;
export default class Highlight {
    setTarget(target) {
        _mesh = new Mesh(target.geometry, highlight_material);
        target.add(_mesh);
    }

    get mesh() {
        return _mesh;
    }

    clear() {
        deleteObject3D(_mesh);
        _mesh = null;
    }

    tick(delta) {
        if (_mesh) _mesh.material.uniforms.uTime.value += delta;
    }
}