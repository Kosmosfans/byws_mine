import patrol_paths from "../config/patrol_paths.json" assert { type: "JSON" };

import {
    Group,
    InstancedMesh,
    Mesh,
    MeshLambertMaterial,
    PlaneGeometry
} from "three";
import * as BGU from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { scanner_material, thread_material } from "./shaderMaterials.js";
import createTunnelGeometry from "./tunnelGeom.js";

export default function patrolMesh(meshFromGltf) {
    const robots = new InstancedMesh(meshFromGltf.geometry, createRobotMat(), patrol_paths.length);
    const scan = new InstancedMesh(createScanGeom(), scanner_material, patrol_paths.length);
    const rail = new Mesh(createRailGeom(), thread_material);

    const group = new Group();
    group.add(robots, scan, rail);
    return group;
}

function createRobotMat() {
    return new MeshLambertMaterial({ color: 0x666666 });
}

function createScanGeom() {
    const size = { x: 2.5, y: 2.5 };

    const part1 = new PlaneGeometry(size.x, size.y);
    part1.translate(size.x * 0.5, 0, 0);
    part1.rotateX(-Math.PI / 2);

    const part2 = new PlaneGeometry(size.x, size.y);
    part2.translate(size.x * 0.5, 0, 0);

    const geom = BGU.mergeGeometries([part1, part2]);
    geom.rotateZ(-Math.PI * 2 / 3);

    return geom;
}

function createRailGeom() {
    const tunnels = {};
    patrol_paths.forEach((p, i) => tunnels[i] = getRailPosition(p));
    return createTunnelGeometry(tunnels, 0.05, false);
}

function getRailPosition(p) {
    const start = { x: p.start.x, y: p.start.y + .7, z: p.start.z };
    const end = { x: p.end.x, y: p.end.y + .7, z: p.end.z };
    return { start, end };
}