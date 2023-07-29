import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function initMouseControl(world) {
    const oc = new OrbitControls(world.camera, world.renderer.domElement);

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
