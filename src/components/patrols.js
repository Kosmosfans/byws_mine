import Patrol from "../core/Patrol.js";

export default function initPatrol(world) {
    const mesh = world.gltf.scene.getObjectByName('patrol_robot');
    mesh.visible = false;

    const patrol = new Patrol(mesh);

    world.add(patrol.mesh);
    world.registerUpdatable(patrol);
    return patrol;
}