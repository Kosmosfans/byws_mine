import geophone_locations from "../config/geophone_locations.json" assert { type: 'JSON' };
import seismicMesh from "./seismicMesh";
import { distance, clamp } from "./utils/utils.js";
import { Color } from "three";

const cfg = {
    sound_speed: 16,
    wave_life: 4.0,
    sensor_thresh: 1.0,
    sensor_color: { hue: 0.03, sat: 0.9 },
    sensor_decay: 0.03
}

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

    sensors.forEach((v, i) => updateSensor(i));
    _mesh.children[1].instanceColor.needsUpdate = true;
}

function updateWave(w, delta) {
    w.elapsed += delta;
    w.mesh.scale.set(1, 1, 1).multiplyScalar(w.elapsed * cfg.sound_speed);
    w.mesh.material.opacity = 0.1 * (1 - w.elapsed / cfg.wave_life);

    if (w.elapsed < cfg.wave_life) return;

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
    const waveFrontDist = distance(sensor, origin) - wave.elapsed * cfg.sound_speed;

    return Math.abs(waveFrontDist) < cfg.sensor_thresh;
}

function setSensorValue(i, isActivate) {
    sensors[i] = isActivate ? 1 : clamp(sensors[i] - cfg.sensor_decay, 0, 1);
    _mesh.children[1].setColorAt(i, color.setHSL(cfg.sensor_color.hue, cfg.sensor_color.sat, sensors[i] / 2));
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

