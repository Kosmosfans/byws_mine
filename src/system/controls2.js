import CameraControls from "camera-controls";
import camera_status from "/src/data/camera_status.json" assert { type: 'JSON' };

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
    Vector2: Vector2,
    Vector3: Vector3,
    Vector4: Vector4,
    Quaternion: Quaternion,
    Matrix4: Matrix4,
    Spherical: Spherical,
    Box3: Box3,
    Sphere: Sphere,
    Raycaster: Raycaster,
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

export function setCamera(type) {
    const cs = camera_status[type];
    cc.setLookAt(cs.px, cs.py, cs.pz, cs.tx, cs.ty, cs.tz, true).then();
    cc.zoomTo(cs.zoom, true).then();
}