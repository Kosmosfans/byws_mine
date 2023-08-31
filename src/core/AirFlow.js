import tunnels from '/src/cfg/tunnels.json' assert { type: 'JSON' };

import createTunnelGeometry from "./tunnelGeom.js";
import { Mesh } from "three";
import { cloud_material } from "./shaderMaterials.js";
import { palette1 } from "./palettes.js";
import { range } from "./utils/utils.js";

let _mesh, palette, material, width;

export default class AirFlow {
    constructor(data, settings = {}) {
        init(data, settings);
    }

    get mesh() {
        return _mesh;
    }

    tick = delta => update(delta);
}

function init(data, settings) {
    width = settings['width'] || 0.2;
    material = settings['material'] || cloud_material;
    palette = settings['palette'] || palette1;

    _mesh = createMesh();

    updateAttributes(data);
    dataDriven();
}

function createMesh() {
    const geom = createTunnelGeometry(tunnels, width);
    return new Mesh(geom, material);
}

function update(delta) {
    _mesh.material.uniforms.uTime.value += delta;
}


function updateAttributes(data) {
    data.forEach(updateAttributesOfSegment);

    _mesh.geometry.attributes.speed.needsUpdate = true;
    _mesh.geometry.attributes.color.needsUpdate = true;
}

function updateAttributesOfSegment(info) {
    // speed
    range(6).forEach(j => _mesh.geometry.attributes.speed.array[info.index * 6 + j] = info.speed);

    // color
    const color = palette.getColor(info.speed, info.warning, info.inactive);
    range(6).forEach(j => {
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3] = color[0];
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3 + 1] = color[1];
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3 + 2] = color[2];
    });
}

function dataDriven() {
    document.addEventListener("air_update", e => updateAttributes(e.detail.data));
}