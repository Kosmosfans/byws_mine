export default class Resizer {
    constructor(container, camera, renderer) {
        camera.aspect = container.clientWidth / container.clientHeight;

        // update the camera's frustum
        camera.updateProjectionMatrix();

        // update the size of the renderer AND the canvas
        renderer.setSize(container.clientWidth, container.clientHeight);

        // set the pixel ratio
        renderer.setPixelRatio(window.devicePixelRatio);
    }
}
