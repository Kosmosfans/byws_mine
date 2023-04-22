import { PerspectiveCamera, OrthographicCamera } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(45, 1, 0.5, 1000);
    camera.position.set(170, 100, 156);

    return camera;
}

export { createCamera };