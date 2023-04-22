import { DirectionalLight, AmbientLight, HemisphereLight } from 'three';

function createLights() {
    const directionalLight = new DirectionalLight('#FFFFFF', 0.8);
    // directionalLight.castShadow = true;
    directionalLight.position.set(-20, 40, 10);

    // remove artifacts in shadow, don't know why
    directionalLight.shadow.bias = -0.0001;

    directionalLight.shadow.radius = 1.2;
    directionalLight.shadow.mapSize.width = 4096;
        directionalLight.shadow.mapSize.height = 4096;

    // const ambientLight = new AmbientLight('white', 0.7);
    const ambientLight = new HemisphereLight('#FFFFFF', 'darkslategrey', 0.8);

    return { directionalLight, ambientLight };
}

export { createLights };