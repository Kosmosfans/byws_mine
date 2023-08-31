import surveillanceMesh from "./surveillanceMesh.js";
import { Color, Object3D, Vector3 } from "three";
import { rand, randRange } from "./utils/utils.js";

const AXIS_Y = new Vector3(0, 1, 0);
const COLOR_1 = new Color(0.2, 0.9, 0.2);
const COLOR_2 = new Color(0.2, 0.9, 0.9);

let _mesh, dummy, phases, positions, moving;

export default class Surveillance {
    constructor(_positions) {
        positions = _positions;
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick(delta) {
        _mesh.children[0].material.uniforms.uTime.value += delta;
        animate(delta);
    }
}

function init() {
    dummy = new Object3D();
    moving = new Map();

    _mesh = surveillanceMesh(positions.length);

    phases = positions.map(() => randRange(0, Math.PI * 2));
    initSurveillancePositions();
    initSurveillanceColors();

    dataDriven();
}

function initSurveillancePositions() {
    phases.forEach((v, i) => initCameraPosition(i));
}

function initCameraPosition(i) {
    dummy.setRotationFromAxisAngle(AXIS_Y, phases[i]);
    dummy.position.copy(positions[i]);
    dummy.updateMatrix();

    _mesh.children[0].setMatrixAt(i, dummy.matrix);
    _mesh.children[1].setMatrixAt(i, dummy.matrix);
}

function initSurveillanceColors() {
    phases.forEach((v, i) => _mesh.children[0].setColorAt(i, rand() > 0.8 ? COLOR_2 : COLOR_1));
}

function animate(delta) {
    for (let [i, c] of moving) updateCameraPhase(i, c, delta);

    _mesh.children[0].instanceMatrix.needsUpdate = true;
    _mesh.children[1].instanceMatrix.needsUpdate = true;
}

function updateCameraPhase(i, c, delta) {
    phases[i] += delta * 0.8 * c.dir;

    dummy.setRotationFromAxisAngle(AXIS_Y, phases[i]);
    dummy.position.copy(positions[i]);
    dummy.updateMatrix();

    _mesh.children[0].setMatrixAt(i, dummy.matrix);
    _mesh.children[1].setMatrixAt(i, dummy.matrix);

    if (--c.frames <= 0) moving.delete(i);
}

function dataDriven() {
    document.addEventListener('surveillance_update', e => setMovingCameras(e.detail.data));
}

function setMovingCameras(cameras) {
    cameras.forEach(c => moving.set(c.index, c));
}