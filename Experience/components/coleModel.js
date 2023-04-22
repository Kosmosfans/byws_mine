import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

import { Color, DoubleSide, MeshBasicMaterial, MeshStandardMaterial, TextureLoader } from "three";

let textureLookup = [
    { mesh: 'buildings', file: '/textures/baked1.png' },
    { mesh: 'terrain', file: '/textures/baked2.png' },
    { mesh: 'grass', file: '/textures/baked2.png' },
    { mesh: 'coal_layer', file: '/textures/baked3.png' },
    { mesh: 'frame', file: '/textures/baked3.png' },
];

async function loadMineModel() {
    const loader = setupLoader();
    const gltf = await loader.loadAsync('/models/mine_combined_bake.glb');
    setupModel(gltf);
    return gltf;
}

function setupLoader() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    return gltfLoader;
}

function setupModel(gltf) {
    assignMaterials(gltf);
    transformation(gltf);
}

function assignMaterials(gltf) {
    const mats = createMaterialLookup();
    gltf.scene.traverse(node => mats.has(node.name) ? assignMaterial(node, mats.get(node.name)) : {});
}

function transformation(gltf) {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, 40, 0);
}

function createMaterialLookup() {
    const loader = new TextureLoader();

    const uniqueMaterials = new Map();
    new Set(textureLookup.map(n => n.file)).forEach(f => {
        const texture = loader.load(f);
        texture.flipY = false;
        const material = new MeshBasicMaterial({ map: texture });
        uniqueMaterials.set(f, material);
    })

    const result = new Map();
    textureLookup.forEach(n => result.set(n.mesh, uniqueMaterials.get(n.file)));
    return result;
}

function assignMaterial(mesh, material) {
    if (mesh.type === 'Mesh') mesh.material = material;
    if (mesh.type === 'Group') mesh.children.forEach(n => assignMaterial(n, material));
}

export { loadMineModel };