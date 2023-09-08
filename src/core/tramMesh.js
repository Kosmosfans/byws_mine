import { Group, Mesh, Vector3 } from "three";
import { thread_material } from "./shaderMaterials.js";
import createTunnelGeometry from "./tunnelGeom.js";

export default function tramMesh(meshFromGltf, start, end) {
    const rail = new Mesh(createRailGeom(start, end), thread_material);

    const group = new Group();
    group.add(meshFromGltf, rail);
    return group;
}

function createRailGeom(start, end) {
    const offs = new Vector3(0, 0.15, 0);
    const tunnels = { 'tunnel_1': { 'start': start.clone().add(offs), 'end': end.clone().add(offs) } };
    return createTunnelGeometry(tunnels, 0.05, false);
}