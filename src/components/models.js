import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import MESH_ATTR from '/src/data/mesh_attr.json' assert { type: 'JSON' };

import { Mesh, MeshBasicMaterial, TextureLoader } from "three";

let gltf, materials;

export default async function loadMineModel(world) {
    const loader = setupLoader();
    gltf = await loader.loadAsync('/models/byws_all_unlit2.glb');
    setupModel();

    world.add(gltf.scene);
    return gltf;
}

function setupLoader() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    return gltfLoader;
}

function setupModel() {
    assignMaterials();
    transformation();
}

function assignMaterials() {
    createMaterials();
    gltf.scene.traverse(node => assignMaterial(node));
}

function transformation() {
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, 0, 0);
}

function createMaterials() {
    materials = new Map();
    const textureFiles = new Set(Object.keys(MESH_ATTR).filter(n => MESH_ATTR[n]['texture']).map(k => MESH_ATTR[k]['texture']));
    textureFiles.forEach(f => createMaterial(f));
}

function createMaterial(f) {
    const texture = new TextureLoader().load(f);

    texture.flipY = false;

    // todo: test performance impact
    // texture.anisotropy = 4;

    const material = new MeshBasicMaterial({ map: texture });
    materials.set(f, material);
}

function assignMaterial(mesh) {
    if (!(mesh instanceof Mesh)) return;

    const attr = MESH_ATTR[mesh.name] || {};
    if (attr.use_bake) mesh.material = materials.get(attr.texture);
}
