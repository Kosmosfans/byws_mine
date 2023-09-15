import Patrol from "../core/Patrol.js";

export default function initPatrol(world) {
    const mesh = world.gltf.scene.getObjectByName('patrol_robot');
    return new Patrol(mesh);
}