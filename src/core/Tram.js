import { Vector3 } from "three";

let position, start, end, target, buffer, _mesh;
let elapsed, velocity;

const BUFFER_ACCESS_INTERVAL = 3.0;

export default class Tram {
    constructor(mesh, _start, _end) {
        _mesh = mesh;
        start = _start;
        end = _end;
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick = delta => update(delta);
}

function init() {
    elapsed = 0;

    position = new Vector3().copy(start);
    target = new Vector3().copy(position);
    buffer = new Vector3().copy(target);
    velocity = new Vector3();

    _mesh.position.set(start.x, start.y, start.z);

    dataDriven();
}

function update(delta) {
    elapsed += delta;
    if (elapsed >= BUFFER_ACCESS_INTERVAL) updateTarget();

    position.add(velocity.clone().multiplyScalar(delta));
    _mesh.position.set(position.x, position.y, position.z);
}

function updateTarget() {
    target = buffer;
    elapsed -= BUFFER_ACCESS_INTERVAL;

    // update speed of tram (meters per second)
    velocity = target.clone().sub(position).multiplyScalar(1 / BUFFER_ACCESS_INTERVAL);
}

function dataDriven() {
    document.addEventListener('tram_update', e => updateBuffer(e.detail.data));
}

function updateBuffer(prop) {
    buffer.lerpVectors(start, end, prop);
}