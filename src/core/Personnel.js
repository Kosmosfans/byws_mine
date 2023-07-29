import { Object3D, Vector3 } from "three";
import personnelMesh from "./personnelMesh.js";
import { outside, rand, randInt } from "./utils/utils.js";
import { sampleTunnel, tunnelDiff } from "./utils/sampler.js";

let _mesh, data, dummy;
const roaming = new Map();

export default class Personnel {
    constructor(instructions) {
        initMesh(instructions);
        dataDriven();
    }

    get mesh() {
        return _mesh;
    }

    tick(delta) {
        _mesh.material.uniforms.uTime.value += delta;
        roam();
    }
}

function initMesh(_data) {
    data = _data;
    _mesh = personnelMesh(data.length);
    dummy = new Object3D();

    data.forEach((v, i) => move(i, v.position));
}

function roam() {
    for (let [idx, info] of roaming) {
        const person = data[idx];
        person.position.add(info.increment);
        person.proportion += info.delta;

        if (outside(person.proportion, 0, 1)) info.delta = -info.delta;
        if (outside(person.proportion, 0, 1)) info.increment.multiplyScalar(-1);

        move(idx, person.position);

        if (--info.life < 0) roaming.delete(idx);
    }

    _mesh.instanceMatrix.needsUpdate = true;
}

function move(index, pos) {
    dummy.position.set(pos.x, pos.y, pos.z);
    dummy.updateMatrix();
    _mesh.setMatrixAt(index, dummy.matrix);
}

function update(indices) {
    indices.forEach(index => simulateActions(index));
    _mesh.instanceMatrix.needsUpdate = true;
}

function simulateActions(i) {
    const flag = data[i].inactive;
    flag ? (rand() > 0.8 ? activate(i) : {}) : (rand() > 0.8 ? deactivate(i) : setupRoam(i));
    move(i, data[i].position);
}

function activate(idx) {
    const sample = sampleTunnel();
    data[idx].tunnelIdx = sample.tunnelIdx;
    data[idx].proportion = sample.proportion;
    data[idx].position = sample.position;
    data[idx].inactive = false;
}

function deactivate(idx) {
    data[idx].position = new Vector3(0, -9999, 0);
    data[idx].inactive = true;

    roaming.delete(idx);
}

function setupRoam(idx) {
    const delta = rand() * 0.002;
    const increment = tunnelDiff(data[idx].tunnelIdx).multiplyScalar(delta);
    const frames = randInt(800);

    const target = {};
    target.delta = delta;
    target.increment = increment;
    target.life = frames;
    roaming.set(idx, target);
}

function dataDriven() {
    document.addEventListener("personnel_update", (e) => update(e.detail.data));
}