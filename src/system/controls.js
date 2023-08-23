import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Vector3 } from "three";

let camera, oc;

export default function initMouseControl(world) {
    camera = world.camera;
    oc = new OrbitControls(camera, world.renderer.domElement);

    oc.minAzimuthAngle = 0.;
    oc.maxAzimuthAngle = Math.PI / 2.0;
    oc.maxPolarAngle = Math.PI / 2.0;

    oc.minZoom = 6.0;
    oc.maxZoom = 30.0;

    oc.rotateSpeed = 0.4;
    oc.panSpeed = 0.5;
    oc.zoomSpeed = 0.4;

    oc.enableDamping = true;

    oc.tick = () => oc.update();
    world.registerUpdatable(oc);

    return oc;
}
//
// export function setCamera() {
//     const pos = new Vector3(31, 216, 34);
//     const target = new Vector3(0, 0, 0);
//     const zoom = 9.6;
//     camera.position.set(pos.x, pos.y, pos.z);
//     camera.updateProjectionMatrix();
// }