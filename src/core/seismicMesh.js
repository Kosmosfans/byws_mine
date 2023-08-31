import geophone_locations from "../cfg/geophone_locations.json" assert { type: 'JSON' };
import { Group, IcosahedronGeometry, InstancedMesh, Mesh, MeshBasicMaterial } from "three";
import { range } from "./utils/utils.js";

export default function seismicMesh() {
    const group = new Group();
    group.add(createWaveMesh(), createSensorMesh());

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
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.08,
        wireframe: true
    })

    const mesh = new Mesh(geom, mat);
    mesh.visible = false;

    return mesh;
}

function createSensorMesh() {
    const count = geophone_locations.length;
    const mesh = new InstancedMesh(new IcosahedronGeometry(0.25, 1), new MeshBasicMaterial(), count);
    initSensorLocations(mesh);
    return mesh;
}

function initSensorLocations(mesh) {
    geophone_locations.forEach((v, i) => {
        mesh.instanceMatrix.array[i * 16 + 12] = v.x;
        mesh.instanceMatrix.array[i * 16 + 13] = v.y;
        mesh.instanceMatrix.array[i * 16 + 14] = v.z;
    })
}