import { Vector3 } from "three";
import tramMesh from "./tramMesh.js";

let position, start, end, target, buffer, _mesh;
let elapsed, velocity;

const INTERVAL = 3.0;

export default class Tram {
    constructor(meshFromGltf, _start, _end) {
        start = _start;
        end = _end;
        _mesh = tramMesh(meshFromGltf, start, end);
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick(delta) {
        _mesh.children[1].material.uniforms.uTime.value += delta;
        update(delta);
    }
}

function init() {
    elapsed = 0;

    position = new Vector3().lerpVectors(start, end, 0.06);
    target = new Vector3().copy(position);
    buffer = new Vector3().copy(target);
    velocity = new Vector3();

    _mesh.children[0].position.set(start.x, start.y, start.z);

    dataDriven();
}

function update(delta) {
    elapsed += delta;
    if (elapsed >= INTERVAL) updateTarget();

    position.add(velocity.clone().multiplyScalar(delta));
    _mesh.children[0].position.set(position.x, position.y, position.z);
}

function updateTarget() {
    target = buffer;
    elapsed -= INTERVAL;

    // update speed of tram (meters per second)
    velocity = target.clone().sub(position).multiplyScalar(1 / INTERVAL);
}

function dataDriven() {
    document.addEventListener('tram_update', e => updateBuffer(e.detail.data));
}

function updateBuffer(pct) {
    buffer.lerpVectors(start, end, pct);
}