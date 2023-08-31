import { Object3D, Vector3 } from "three";
import personnelMesh from "./personnelMesh.js";
import { outside, rand, randInt } from "./utils/utils.js";
import { sampleTunnel, tunnelDirection } from "./utils/sampler.js";

let _mesh, data, dummy, roaming;

export default class Personnel {
    constructor(_data) {
        data = _data;
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick = (delta) => animate(delta);
}

function init() {
    _mesh = personnelMesh(data.length);

    dummy = new Object3D();
    roaming = new Map();

    data.forEach((v, i) => move(i, v.position));

    dataDriven();
}

function animate(delta) {
    for (let [i, info] of roaming) updatePersonPos(i, info);

    _mesh.instanceMatrix.needsUpdate = true;
    _mesh.material.uniforms.uTime.value += delta;
}

function updatePersonPos(i, info) {
    data[i].position.add(info.increment);
    move(i, data[i].position);

    if (--info.life < 0) roaming.delete(i);

    data[i].proportion += info.speed;
    if (!outside(data[i].proportion, 0, 1)) return;

    info.speed = -info.speed;
    info.increment.multiplyScalar(-1);
}

function move(i, pos) {
    dummy.position.set(pos.x, pos.y, pos.z);
    dummy.updateMatrix();
    _mesh.setMatrixAt(i, dummy.matrix);
}

function updatePersonStatus(personList) {
    personList.forEach(makeRandomAction);
    _mesh.instanceMatrix.needsUpdate = true;
}

function makeRandomAction(i) {
    data[i].inactive ? (rand() > 0.8 ? activate(i) : {}) : (rand() > 0.8 ? deactivate(i) : roam(i));
    move(i, data[i].position);
}

function activate(i) {
    const sample = sampleTunnel();
    data[i].tunnelIdx = sample.tunnelIdx;
    data[i].proportion = sample.proportion;
    data[i].position = sample.position;
    data[i].inactive = false;
}

function deactivate(i) {
    data[i].position = new Vector3(0, -9999, 0);
    data[i].inactive = true;

    roaming.delete(i);
}

function roam(i) {
    const speed = rand() * 0.001;
    const increment = tunnelDirection(data[i].tunnelIdx).multiplyScalar(speed);
    const life = randInt(800);

    roaming.set(i, { 'speed': speed, 'increment': increment, 'life': life });
}

function dataDriven() {
    document.addEventListener("personnel_update", e => updatePersonStatus(e.detail.data));
}