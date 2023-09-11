import { Mesh } from "three";
import { highlight_material } from "./shaderMaterials.js";
import { deleteObject3D } from "./utils/utils.js";

export default class Highlight {
    setTarget(target) {
        this._mesh = new Mesh(target.geometry, highlight_material);
        target.add(this._mesh);
    }

    get mesh() {
        return this._mesh;
    }

    clear() {
        deleteObject3D(this._mesh);
        this._mesh = null;
    }

    tick(delta) {
        if (this._mesh) this._mesh.material.uniforms.uTime.value += delta;
    }
}