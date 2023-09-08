import { InstancedMesh, OctahedronGeometry } from "three";
import { sensor_material } from "./shaderMaterials.js";

export default function monitorMesh(data) {
    const mesh = new InstancedMesh(initGeom(), sensor_material, data.length);
    initLocations(data, mesh);
    return mesh;
}

function initGeom() {
    return new OctahedronGeometry(0.16, 0);
}

function initLocations(data, mesh) {
    data.forEach((v, i) => {
        mesh.instanceMatrix.array[i * 16 + 12] = v.x;
        mesh.instanceMatrix.array[i * 16 + 13] = v.y;
        mesh.instanceMatrix.array[i * 16 + 14] = v.z;
    })
}