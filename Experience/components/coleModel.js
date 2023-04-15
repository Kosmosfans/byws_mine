import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

import { Color, DoubleSide, MeshBasicMaterial, MeshStandardMaterial, TextureLoader } from "three";

async function loadModel() {
    const loader = setupLoader();
    const gltf = await loader.loadAsync('/models/mine_bake3.glb');
    setupModel(gltf);
    return gltf.scene;
}

function setupLoader() {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader);
    return loader;
}

function setupModel(gltf) {
    const loader = new TextureLoader();

    const textureTerrainCombined = loader.load('/textures/terrain_combined.png');
    textureTerrainCombined.flipY = false;
    const materialTerrainCombined = new MeshBasicMaterial({ map: textureTerrainCombined });

    const textureBuildingCombined = loader.load('/textures/building_combined.png');
    textureBuildingCombined.flipY = false;
    const materialBuildingCombined = new MeshBasicMaterial({ map: textureBuildingCombined });

    const textureTunnelCombined = loader.load('/textures/tunnel_combined.png');
    textureTunnelCombined.flipY = false;
    const materialTunnelCombined = new MeshBasicMaterial({ map: textureTunnelCombined });
    materialTunnelCombined.side = DoubleSide;


    gltf.scene.traverse((node) => {
        if (['terrain', 'roads', 'grass'].includes(node.name)) node.material = materialTerrainCombined;
        if (['tunnel', 'frame'].includes(node.name)) node.material = materialTunnelCombined;
        if (node.name === 'buildings') node.children.forEach(n => n.material = materialBuildingCombined);
    })


    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.position.set(-10, 10, 0);
}

export { loadModel };