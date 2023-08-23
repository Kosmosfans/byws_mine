import { Matrix4, Quaternion, Vector3 } from "three";
import { rand, randArray } from "./utils/utils.js";
import particleFlowMesh from "./particleFlowMesh.js";

let settings, ps = {}, _mesh, paths, dummy, time = 0;

export default class ParticleFlow {
    constructor(_paths, _settings = {}) {
        paths = _paths;
        settings = _settings;
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick = (delta) => update(delta);
}

function init() {
    initDummy();
    calcPathsDetail();
    calcPathCapacity();
    initParticles();
    initMesh();

    dataDriven();
}

function initDummy() {
    dummy = {};
    dummy.matrix = new Matrix4();
    dummy.rotationAxis = new Vector3(1, 0, 0);
    dummy.quaternion = new Quaternion();
    dummy.scale = new Vector3();
}

function calcPathsDetail() {
    paths.forEach(p => calcPathDetail(p));
}

function calcPathDetail(p) {
    p.dx = p.end.x - p.start.x;
    p.dy = p.end.y - p.start.y;
    p.dz = p.end.z - p.start.z;
    p.distance = Math.sqrt(p.dx * p.dx + p.dy * p.dy + p.dz * p.dz);
}

function calcPathCapacity() {
    const maxParticleCnt = settings['particleCnt'] || 5000;
    const totalDistance = paths.map(p => p.distance).reduce((a, b) => a + b, 0);

    let runningTotal = 0;
    paths.forEach(p => {
        p.particleCnt = Math.ceil(p.distance / totalDistance * maxParticleCnt);
        p.startPosition = runningTotal;
        runningTotal += p.particleCnt;
    });
    ps.size = runningTotal;
}

function initParticles() {
    ps.progresses = new Float32Array(ps.size);
    ps.positions = new Float32Array(ps.size * 3);
    ps.jitters = randArray(200, settings['tunnelWidth'] || 0.3);

    paths.forEach(p => initParticlesOfPath(p));
}

function initParticlesOfPath(path) {
    for (let i = path.startPosition; i < path.startPosition + path.particleCnt; i++) {
        ps.progresses[i] = rand();
        const hash = i % 100;

        ps.positions[i * 3] = path.start.x + path.dx * ps.progresses[i] + ps.jitters[hash * 2];
        ps.positions[i * 3 + 1] = path.start.y + path.dy * ps.progresses[i];
        ps.positions[i * 3 + 2] = path.start.z + path.dz * ps.progresses[i] + ps.jitters[hash * 2 + 1];
    }
}

function initMesh() {
    _mesh = particleFlowMesh(ps.size, settings['particleSize'] || 0.2);
    updateMesh();
}

function update(delta) {
    time += delta / 3;
    paths.forEach(p => updateParticlesOfPath(p, delta));

    updateMesh();
}

function updateParticlesOfPath(path, delta) {
    const deltaProgress = Math.min(0.01, path.speed * delta / path.distance);
    const deltaX = path.dx * deltaProgress;
    const deltaY = path.dy * deltaProgress;
    const deltaZ = path.dz * deltaProgress;

    for (let i = path.startPosition; i < path.startPosition + path.particleCnt; i++) {
        ps.progresses[i] += deltaProgress;

        ps.positions[i * 3] += deltaX;
        ps.positions[i * 3 + 1] += deltaY;
        ps.positions[i * 3 + 2] += deltaZ;

        if (ps.progresses[i] < 1) continue;

        ps.progresses[i] -= 1;

        const hash = i % 100;
        ps.positions[i * 3] = path.start.x + ps.progresses[i] * path.dx + ps.jitters[hash * 2];
        ps.positions[i * 3 + 1] = path.start.y + ps.progresses[i] * path.dy;
        ps.positions[i * 3 + 2] = path.start.z + ps.progresses[i] * path.dz + ps.jitters[hash * 2 + 1];
    }
}

function updateMesh() {
    for (let i = 0; i < ps.size; i++) {
        const p = new Vector3(ps.positions[i * 3], ps.positions[i * 3 + 1], ps.positions[i * 3 + 2]);
        particleMatrix(p, i, time);
        _mesh.setMatrixAt(i, dummy.matrix);
    }

    _mesh.instanceMatrix.needsUpdate = true;
}

function particleMatrix(position, hash, time) {
    dummy.quaternion.setFromAxisAngle(dummy.rotationAxis, hash + time);
    dummy.scale.x = dummy.scale.y = dummy.scale.z = 0.3 + (hash % 17) / 17;
    dummy.matrix.compose(position, dummy.quaternion, dummy.scale);
}

function dataDriven() {
    document.addEventListener('conveyor_update', e => updatePathsVelocity(e.detail.data));
}

function updatePathsVelocity(data) {
    data.forEach((v, i) => paths[i].speed = v);
}