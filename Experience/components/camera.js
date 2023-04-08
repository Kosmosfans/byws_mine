import { PerspectiveCamera, OrthographicCamera } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(5, 3, 6);
    return camera;
}

export { createCamera };