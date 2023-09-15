import MESH_ATTR from '/src/config/mesh_attr.json' assert { type: 'JSON' };

import { Group, Mesh, MeshBasicMaterial, TextureLoader } from "three";
import gltfLoader from "../core/utils/loaders.js";
import scenarios from "../system/scenarios.js";

const URL = "/models/byws_all_unlit.glb";
let gltf, materials;

export default async function setupModels() {
    await setupGltf();
    assignMeshesToScenarios();

    return gltf;
}

async function setupGltf() {
    await loadGltf();
    cleanUp();
    assignMaterials();
    transformation();
}

async function loadGltf() {
    gltf = await gltfLoader.load(URL);
}

function cleanUp() {
    gltf.scene.getObjectByName('tram').visible = false;
    gltf.scene.getObjectByName('patrol_robot').visible = false;
}

function assignMaterials() {
    createMaterials();
    gltf.scene.traverse(node => assignMaterial(node));
}

function createMaterials() {
    materials = new Map();
    const textureFiles = new Set(Object.keys(MESH_ATTR).filter(n => MESH_ATTR[n]['texture']).map(k => MESH_ATTR[k]['texture']));
    textureFiles.forEach(createMaterial);
}

function createMaterial(f) {
    const texture = new TextureLoader().load(f);

    texture.flipY = false;

    // todo: test performance impact
    // texture.anisotropy = 8;

    const material = new MeshBasicMaterial({ map: texture });
    materials.set(f, material);
}

function assignMaterial(mesh) {
    if (!(mesh instanceof Mesh)) return;

    const attr = MESH_ATTR[mesh.name] || {};
    if (attr.use_bake) mesh.material = materials.get(attr.texture);
}

function transformation() {
    // gltf.scene.scale.set(1, 1, 1);
    // gltf.scene.position.set(0, 0, 0);
}

function assignMeshesToScenarios() {
    const stratum = new Group();

    ['01', '02', '03', '04'].forEach(id => {
        const mesh = gltf.scene.getObjectByName('layer' + id);
        gltf.scene.remove(mesh);
        stratum.add(mesh);
    })

    scenarios.addMesh('stratum', stratum);
    scenarios.addMesh('tunnel', gltf.scene);
}