import geophone_locations from "../data/static/geophone_locations.json" assert { type: 'JSON' };
import { Group, IcosahedronGeometry, InstancedMesh, Mesh, MeshBasicMaterial, Object3D } from "three";
import { range } from "./utils/utils.js";

export default function seismicMesh() {
    const waveMesh = createWaveMesh();
    const geophoneMesh = createGeophoneMesh();

    const group = new Group();
    group.add(waveMesh, geophoneMesh);

    return group;
}

function createWaveMesh() {
    const result = new Group();
    range(5).forEach(() => result.add(createSingleWave()));
    return result;
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

function createGeophoneMesh() {
    const count = geophone_locations.length;
    const mesh = new InstancedMesh(new IcosahedronGeometry(0.25, 1), new MeshBasicMaterial(), count);
    initGeophoneLocations(mesh);
    return mesh;
}

function initGeophoneLocations(mesh) {
    const dummy = new Object3D();

    geophone_locations.forEach((v, i) => {
        dummy.position.set(v.x, v.y, v.z);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
    })
}