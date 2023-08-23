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
    const geom = createTunnelGeometry(width);
    return new Mesh(geom, material);
}

function update(delta) {
    _mesh.material.uniforms.uTime.value += delta;
}


function updateAttributes(data) {
    data.forEach(d => {
        updateVelocity(d);
        updateColor(d);
    });

    _mesh.geometry.attributes.speed.needsUpdate = true;
    _mesh.geometry.attributes.color.needsUpdate = true;
}

function updateVelocity(info) {
    // 6 vertices per tunnel segment
    range(6).forEach(j => _mesh.geometry.attributes.speed.array[info.index * 6 + j] = info.speed);
}

function updateColor(info) {
    const color = palette.getColor(info.speed, info.warning, info.inactive);

    // 6 vertices per tunnel, 3 color components per vertex
    range(6).forEach(j => {
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3] = color[0];
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3 + 1] = color[1];
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3 + 2] = color[2];
    });
}

function dataDriven() {
    document.addEventListener("air_update", e => updateAttributes(e.detail.data));
}