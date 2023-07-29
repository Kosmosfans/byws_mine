import { PerspectiveCamera, OrthographicCamera } from 'three';

export default function createCamera() {
    return createOrthographicCamera();
    // return createPerspectiveCamera();
}

function createOrthographicCamera() {
    const camera = new OrthographicCamera(-1, -1, 1, 1, 0.5, 1000);
    camera.position.set(124, 110, 140);
    camera.zoom = 9.2;

    return camera;
}

function createPerspectiveCamera() {
    const camera = new PerspectiveCamera(45, 1, 0.5, 1000);
    camera.position.set(248, 220, 280);
    camera.zoom = 3;

    return camera;
}