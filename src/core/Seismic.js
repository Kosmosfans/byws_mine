import geophone_locations from "../config/geophone_locations2.json" assert { type: 'JSON' };
import seismicMesh from "./seismicMesh";
import { Color } from "three";

const cfg = {
    sound_speed: 16,
    wave_life: 3.4,
    sensor_decay: 0.02
}

let _mesh, waves, sensors, color;
let stratum;

export default class Seismic {
    constructor(_stratum) {
        stratum = _stratum;
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick = (delta) => animate(delta);
}

function init() {
    _mesh = seismicMesh(geophone_locations, stratum);

    waves = new Set();
    sensors = geophone_locations.map(() => 0);
    color = new Color();

    dataDriven();
}

function animate(delta) {
    waves.forEach(w => updateWave(w, delta));
}

function updateWave(wave, delta) {
    wave.elapsed += delta;
    wave.mesh.scale.set(1, 1, 1).multiplyScalar(wave.elapsed * cfg.sound_speed);
    wave.mesh.material.opacity = 0.06 * (1 - wave.elapsed / cfg.wave_life);

    _mesh.children[2].material.uniforms.uElapsed.value[wave.index] = wave.elapsed;

    if (wave.elapsed < cfg.wave_life) return;

    waves.delete(wave);
    wave.mesh.visible = false;

    _mesh.children[2].material.uniforms.uWavePos.value[wave.index].set(0, 0, 0);

}

function dataDriven() {
    document.addEventListener("seismic_update", e => setupWave(e.detail.data));
}

function setupWave(pos) {
    const idleWaveIndex = _mesh.children[0].children.findIndex(m => !m.visible);
    if (idleWaveIndex === -1) return;

    // wave
    const wave = _mesh.children[0].children[idleWaveIndex];
    wave.position.copy(pos);
    wave.visible = true;
    waves.add({ 'index': idleWaveIndex, 'mesh': wave, 'elapsed': 0 });

    // terrain effect
    _mesh.children[2].material.uniforms.uWavePos.value[idleWaveIndex].copy(pos);
    _mesh.children[2].material.uniforms.uElapsed.value[idleWaveIndex] = 0;
}