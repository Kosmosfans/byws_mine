import { AdditiveBlending, Color, Group, IcosahedronGeometry, InstancedMesh, Mesh, MeshBasicMaterial } from "three";
import { range } from "./utils/utils.js";
import { terrain_material } from "./shaderMaterials.js";

let geophone_locations;
const color = new Color(0.3, 0.7, 0.99);

export default function seismicMesh(locations, stratum) {
    geophone_locations = locations;
    const group = new Group();
    group.add(createWaveMesh(), createSensorMesh(), createTerrainSurface(stratum));

    return group;
}

function createWaveMesh() {
    const mesh = new Group();

    range(5).forEach(() => mesh.add(createSingleWave()));
    return mesh;
}

function createSingleWave() {
    const geom = new IcosahedronGeometry(1, 5);
    const mat = new MeshBasicMaterial({
        color: color,
        transparent: true,
        blending: AdditiveBlending,
        wireframe: true
    })

    const mesh = new Mesh(geom, mat);
    mesh.visible = false;

    return mesh;
}

function createSensorMesh() {
    const count = geophone_locations.length;
    const mesh = new InstancedMesh(new IcosahedronGeometry(0.2, 1), new MeshBasicMaterial(), count);
    initSensorLocations(mesh);
    mesh.visible = false;

    return mesh;
}

function initSensorLocations(mesh) {
    geophone_locations.forEach((v, i) => {
        mesh.instanceMatrix.array[i * 16 + 12] = v.x;
        mesh.instanceMatrix.array[i * 16 + 13] = v.y;
        mesh.instanceMatrix.array[i * 16 + 14] = v.z;
    })
}

function createTerrainSurface(stratum) {
    return new Mesh(stratum.geometry, terrain_material);
}