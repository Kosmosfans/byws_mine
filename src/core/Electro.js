import tunnels from '/src/cfg/electro_paths.json' assert { type: 'JSON' };

import createTunnelGeometry from "./tunnelGeom.js";
import { Mesh } from "three";
import { electro_material } from "./shaderMaterials.js";
import { palette6 } from "./palettes.js";
import { rand, randRange, range } from "./utils/utils.js";

let _mesh, width, palette;

export default class Electro {
    constructor(settings = {}) {
        init(settings);
    }

    get mesh() {
        return _mesh;
    }

    tick = delta => update(delta);
}

function init(settings) {
    width = settings['width'] || 0.5;
    palette = palette6;

    _mesh = createMesh();
    setupColors();
}

function createMesh() {
    const geom = createTunnelGeometry(tunnels, width);
    return new Mesh(geom, electro_material);
}

function setupColors() {
    Object.keys(tunnels).forEach((v, i) => setupColor(i));
    _mesh.geometry.attributes.color.needsUpdate = true;
}

function setupColor(i) {
    const color = palette.getColor(randRange(0.15, 0.2), false, false);

    // 6 vertices per tunnel, 3 color components per vertex
    range(6).forEach(j => {
        _mesh.geometry.attributes.color.array[i * 18 + j * 3] = color[0];
        _mesh.geometry.attributes.color.array[i * 18 + j * 3 + 1] = color[1];
        _mesh.geometry.attributes.color.array[i * 18 + j * 3 + 2] = color[2];
    });
}

function update(delta) {
    _mesh.material.uniforms.uTime.value += delta;
}
