import CameraControls from "camera-controls";

import {
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
} from 'three';

const subsetOfTHREE = {
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
};

CameraControls.install({ THREE: subsetOfTHREE });

let cc;

export default function initCameraControl(world) {
    cc = new CameraControls(world.camera, world.renderer.domElement);

    cc.minAzimuthAngle = 0;
    cc.maxAzimuthAngle = Math.PI / 2;
    cc.minPolarAngle = 0;
    cc.maxPolarAngle = Math.PI / 2;

    cc.minZoom = 6.0;
    cc.maxZoom = 30.0;

    cc.azimuthRotateSpeed = 0.25;
    cc.polarRotateSpeed = 0.25;
    cc.dollySpeed = 2;

    cc.tick = (delta) => cc.update(delta);
    world.registerUpdatable(cc);

    return cc;
}

export function setCamera(status) {
    cc.setLookAt(status['px'], status['py'], status['pz'], status['tx'], status['ty'], status['tz'], true).then();
    cc.zoomTo(status.zoom, true).then();
}