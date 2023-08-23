import { OrthographicCamera, PerspectiveCamera } from 'three';

export default function createCamera() {
    return createOrthographicCamera();
    // return createPerspectiveCamera();
}

function createOrthographicCamera() {
    return new OrthographicCamera(-1, -1, 1, 1, 0.5, 1000);
}

function createPerspectiveCamera() {
    const camera = new PerspectiveCamera(45, 1, 0.5, 1000);
    camera.position.set(248, 220, 280);
    camera.zoom = 3;

    return camera;
}