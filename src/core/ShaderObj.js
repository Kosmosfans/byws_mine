import { Mesh } from "three";

export default class ShaderObj {
    constructor(geom, mat) {
        this._mesh = new Mesh(geom, mat);
    }

    get mesh() {
        return this._mesh;
    }

    tick = (delta) => this._mesh.material.uniforms.uTime.value += delta;
}
