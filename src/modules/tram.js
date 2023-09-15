import { Vector3 } from "three";
import Tram from "../core/Tram.js";

const tunnel_top = new Vector3(5.0729, 32.25, 3.63371);
const tunnel_bottom = new Vector3(71.0683, 11.66, 3.62928);

const tram_start = new Vector3().lerpVectors(tunnel_top, tunnel_bottom, 0.05);
const tram_end = new Vector3().lerpVectors(tunnel_top, tunnel_bottom, 0.98);

export default function initTrams(world) {
    const mesh = world.gltf.scene.getObjectByName('tram');
    mesh.visible = true;

    return new Tram(mesh, tram_start, tram_end);
}