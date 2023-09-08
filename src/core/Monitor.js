import monitorMesh from "./monitorMesh.js";

let _mesh;

export default class Monitor {
    constructor(data) {
        init(data);
    }

    get mesh() {
        return _mesh;
    }

    tick = (delta) => _mesh.material.uniforms.uTime.value += delta;
}

function init(data) {
    _mesh = monitorMesh(data);
    initSensorColors(data);

    dataDriven();
}

function initSensorColors(data) {
    data.forEach((d, i) => _mesh.setColorAt(i, d.color));
}

function dataDriven() {
    document.addEventListener("monitor_update", e => updateSensorColors(e.detail.data));
}

function updateSensorColors(info) {
    info.forEach(v => _mesh.setColorAt(v.index, v.color));
    _mesh.instanceColor.needsUpdate = true;
}

