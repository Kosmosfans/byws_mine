import createTunnelGeometry from "./tunnelGeom.js";
import { Mesh } from "three";
import { cloud_material } from "./shaderMaterials.js";
import { Colors } from "./Colors.js";
import { range } from "./utils/utils.js";

const DEFAULT_WIDTH = 0.2;
const DEFAULT_MATERIAL = cloud_material;
const DEFAULT_SCHEME = Colors.SCHEME1;

let _mesh, scheme, material, width;

export default class AirFlow {
    constructor(data, settings = {}) {
        init(data, settings);
    }

    get mesh() {
        return _mesh;
    }

    tick = (delta) => _mesh.material.uniforms.uTime.value += delta;

}

function init(data, settings) {
    width = settings['width'] || DEFAULT_WIDTH;
    material = settings['material'] || DEFAULT_MATERIAL;
    scheme = settings['scheme'] || DEFAULT_SCHEME;

    _mesh = createMesh();
    update(data);
    dataDriven();
}

function createMesh() {
    const geom = createTunnelGeometry(width);
    return new Mesh(geom, material);
}

function update(data) {
    data.forEach(info => updateAttributes(info));

    _mesh.geometry.attributes.speed.needsUpdate = true;
    _mesh.geometry.attributes.color.needsUpdate = true;
}


function updateAttributes(info) {
    updateVelocity(info);
    updateColor(info);
}

function updateVelocity(info) {
    // 6 vertices per tunnel segment
    range(6).forEach(j => _mesh.geometry.attributes.speed.array[info.index * 6 + j] = info.speed);
}

function updateColor(info) {
    const color = scheme.getColor(info.speed, info.warning, info.inactive);

    // 6 vertices per tunnel, 3 color components per vertex
    range(6).forEach(j => {
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3] = color.r;
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3 + 1] = color.g;
        _mesh.geometry.attributes.color.array[info.index * 18 + j * 3 + 2] = color.b;
    });
}

function dataDriven() {
    document.addEventListener("air_update", (e) => update(e.detail.data));
}