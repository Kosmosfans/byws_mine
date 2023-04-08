import * as THREE from 'three';
import { MeshBasicNodeMaterial, vec4, color, positionLocal, mix } from 'three/nodes';


function createSky() {
    const light = new THREE.DirectionalLight(0xaabbff, 0.3);
    light.position.x = 300;
    light.position.y = 250;
    light.position.z = -500;
    const topColor = new THREE.Color().copy(light.color).convertSRGBToLinear();
    const bottomColor = new THREE.Color(0xffffff).convertSRGBToLinear();
    const offset = 400;
    const exponent = 0.6;

    const h = positionLocal.add(offset).normalize().y;
    const skyMat = new MeshBasicNodeMaterial();
    skyMat.colorNode = vec4(mix(color(bottomColor), color(topColor), h.max(0.0).pow(exponent)), 1.0);
    skyMat.side = THREE.BackSide;

    const sky = new THREE.Mesh(new THREE.SphereGeometry(4000, 32, 15), skyMat);
    return { light, sky };

}

export { createSky };