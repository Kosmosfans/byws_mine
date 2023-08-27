import geophone_locations from "../data/static/geophone_locations.json" assert { type: 'JSON' };
import seismicMesh from "./seismicMesh";
import { range, distance, clamp } from "./utils/utils.js";
import { Color } from "three";

const WAVE_LIFE = 4.0;
const SOUND_SPEED = 16;

const SENSOR_THRESH = 2.0;
const SENSOR_COLOR = { hue: 0.03, sat: 0.9 };
const SENSOR_DECAY = 0.03;

let _mesh, waves, sensors, color;

export default class Seismic {
    constructor() {
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick = (delta) => animate(delta);
}

function init() {
    _mesh = seismicMesh();

    waves = new Set();
    sensors = geophone_locations.map(() => 0);
    color = new Color();

    dataDriven();
}

function animate(delta) {
    waves.forEach(w => updateWave(w, delta));

    range(sensors.length).forEach(i => updateSensor(i));
    _mesh.children[1].instanceColor.needsUpdate = true;
}

function updateWave(w, delta) {
    w.elapsed += delta;
    w.mesh.scale.set(1, 1, 1).multiplyScalar(w.elapsed * SOUND_SPEED);
    w.mesh.material.opacity = 0.1 * (1 - w.elapsed / WAVE_LIFE);

    if (w.elapsed < WAVE_LIFE) return;

    waves.delete(w);
    w.mesh.visible = false;
}

function updateSensor(i) {
    const closeWave = Array.from(waves).find(w => isCloseEnough(i, w));
    setSensorValue(i, closeWave);
}

function isCloseEnough(sensorIdx, wave) {
    const sensor = geophone_locations[sensorIdx];
    const origin = wave.mesh.position;
    const waveFrontDist = distance(sensor, origin) - wave.elapsed * SOUND_SPEED;

    return Math.abs(waveFrontDist) < SENSOR_THRESH;
}

function setSensorValue(i, isActivate) {
    sensors[i] = isActivate ? 1 : clamp(sensors[i] - SENSOR_DECAY, 0, 1);
    _mesh.children[1].setColorAt(i, color.setHSL(SENSOR_COLOR.hue, SENSOR_COLOR.sat, sensors[i] / 2));
}

function dataDriven() {
    document.addEventListener("seismic_update", e => setupWave(e.detail.data));
}

function setupWave(location) {
    const available = _mesh.children[0].children.find(m => !m.visible);
    if (!available) return;

    available.position.copy(location);
    available.visible = true;
    waves.add({ 'mesh': available, 'elapsed': 0 });
}

