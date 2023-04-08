import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

import { Color, DoubleSide, MeshBasicMaterial, MeshStandardMaterial, TextureLoader } from "three";

async function loadModel() {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader);
    const gltf = await loader.loadAsync('/models/mine_baked2.glb');

    setupModel(gltf);

    return gltf.scene;
}

function setupModel(gltf) {
    const loader = new TextureLoader();

    const texFileNames = ['bd00', 'bd01', 'bd02', 'bd03', 'bd04', 'bd05', 'bd06', 'bd07', 'bd08', 'bd09', 'bd10', 'bd11'];
    const materials = {};
    texFileNames.forEach(n => {
        const texture = loader.load('/textures/' + n + '.png');
        texture.flipY = false;
        materials[n] = new MeshBasicMaterial({ map: texture });
    })
    const matGlass = new MeshBasicMaterial({ color: new Color((0xFFFFEE)) });
    const matRoad = new MeshBasicMaterial({ color: new Color(0xa8a8a8) });

    gltf.scene.traverse((node) => {
        if (materials[node.name]) node.material = materials[node.name];
        if (node.name === "glasses") node.material = matGlass;
        if (node.name === "roads") node.material = matRoad;
        if (node.name === "bd00") node.material.side = DoubleSide;
    })


    gltf.scene.scale.set(0.2, 0.2, 0.2);
}

export { loadModel };