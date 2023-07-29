export default function initResizer(world) {
    window.addEventListener('resize', () => setSize(world.container, world.camera, world.renderer));
    window.dispatchEvent(new Event('resize'));
}

const setSize = (container, camera, renderer) => {
    camera.type === 'OrthographicCamera' ? setOrthographicCamera(camera, container) : setPerspectiveCamera(camera, container);
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

const setOrthographicCamera = (camera, container) => {
    camera.left = -container.clientWidth / 2;
    camera.right = container.clientWidth / 2;
    camera.top = container.clientHeight / 2;
    camera.bottom = -container.clientHeight / 2;
}

const setPerspectiveCamera = (camera, container) => {
    camera.aspect = container.clientWidth / container.clientHeight;
}


