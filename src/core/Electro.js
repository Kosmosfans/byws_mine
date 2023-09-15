import tunnels from '/src/config/electro_paths.json' assert { type: 'JSON' };

import createTunnelGeometry from "./tunnelGeom.js";
import { Mesh } from "three";
import { electro_material } from "./shaderMaterials.js";
import palettes from "./palettes.js";
import { rand, range } from "./utils/utils.js";

let _mesh, width, palette;

export default class Electro {
    constructor(settings = {}) {
        init(settings);
    }

    get mesh() {
        return _mesh;
    }

    tick = delta => _mesh.material.uniforms.uTime.value += delta;
}

function init(settings) {
    width = settings.width || 0.5;
    palette = settings.palette || palettes.palette6;

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
    const color = palette.getColor(rand(0.15, 0.2), false, false);

    range(6).forEach(j => {
        _mesh.geometry.attributes.color.array[i * 18 + j * 3] = color[0];
        _mesh.geometry.attributes.color.array[i * 18 + j * 3 + 1] = color[1];
        _mesh.geometry.attributes.color.array[i * 18 + j * 3 + 2] = color[2];
    });
}
