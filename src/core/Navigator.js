import tunnels from '/src/cfg/navigator_paths.json' assert { type: 'JSON' };

import createTunnelGeometry from "./tunnelGeom.js";
import { Mesh } from "three";
import { navigator_material } from "./shaderMaterials.js";
import { palette6 } from "./palettes.js";
import { range } from "./utils/utils.js";

let _mesh, width, palette;

export default class Navigator {
    constructor(settings = {}) {
        init(settings);
    }

    get mesh() {
        return _mesh;
    }

    tick = delta => update(delta);
}

function init(settings) {
    width = settings['width'] || 0.2;
    palette = palette6;

    _mesh = createMesh();
    setupColors();
    setupVelocities();
}

function createMesh() {
    const geom = createTunnelGeometry(tunnels, width);
    return new Mesh(geom, navigator_material);
}

function setupColors() {
    Object.keys(tunnels).forEach((v, i) => setupColor(i));
    _mesh.geometry.attributes.color.needsUpdate = true;
}

function setupColor(i) {
    const color = palette.getColor(0.53, false, false);

    range(6).forEach(j => {
        _mesh.geometry.attributes.color.array[i * 18 + j * 3] = color[0];
        _mesh.geometry.attributes.color.array[i * 18 + j * 3 + 1] = color[1];
        _mesh.geometry.attributes.color.array[i * 18 + j * 3 + 2] = color[2];
    });
}

function setupVelocities() {
    Object.keys(tunnels).forEach((v, i) => setupVelocity(i));
}

function setupVelocity(i) {
    range(6).forEach(j => _mesh.geometry.attributes.speed.array[i * 6 + j] = 1.0);
}

function update(delta) {
    _mesh.material.uniforms.uTime.value += delta;
}
