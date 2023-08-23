import { DirectionalLight, AmbientLight } from 'three';

export default function initLights(world) {
    const directionalLight = new DirectionalLight('#FFFFFF', 1.8);
    directionalLight.position.set(100, 100, 100);

    const ambientLight = new AmbientLight('white', 1.2);

    world.add(directionalLight, ambientLight);
}