import { DirectionalLight, AmbientLight } from 'three';

function createLights() {
    const directionalLight = new DirectionalLight('#FFFFFF', 0.8);
    directionalLight.position.set(-200, 400, 100);

    directionalLight.castShadow = true;
    // remove artifacts in shadow, don't know why
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.radius = 1.2;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = -20;
    directionalLight.shadow.camera.bottom = 20;


    const ambientLight = new AmbientLight('white', 0.7);
    // const ambientLight = new HemisphereLight('#FFFFFF', 'darkslategrey', 0.8);

    return { directionalLight, ambientLight };
}

export { createLights };