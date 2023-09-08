import {
    BoxGeometry,
    Group,
    InstancedMesh,
    MeshLambertMaterial,
    PlaneGeometry
} from "three";
import * as BGU from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { scanner_material } from "./shaderMaterials.js";

const SCAN_SIZE = { x: 2.5, y: 2.5 };
const BOX_SIZE = { x: .4, y: .25, z: .15 };

export default function surveillanceMesh(count) {
    const scan = new InstancedMesh(createScanGeom(), scanner_material, count);
    const surveillance = new InstancedMesh(createCameraGeom(), createCameraMat(), count);

    const group = new Group();
    group.add(scan, surveillance);
    return group;
}

function createScanGeom() {
    const part1 = new PlaneGeometry(SCAN_SIZE.x, SCAN_SIZE.y);
    part1.translate(SCAN_SIZE.x * 0.5, 0, 0);
    part1.rotateX(-Math.PI / 2);

    const part2 = new PlaneGeometry(SCAN_SIZE.x, SCAN_SIZE.y);
    part2.translate(SCAN_SIZE.x * 0.5, 0, 0);

    const geom = BGU.mergeGeometries([part1, part2]);
    geom.rotateZ(-Math.PI / 6);

    return geom;
}

function createCameraGeom() {
    const geom = new BoxGeometry(BOX_SIZE.x, BOX_SIZE.y, BOX_SIZE.z);
    geom.rotateZ(-Math.PI / 6);
    return geom;
}

function createCameraMat() {
    return new MeshLambertMaterial({ color: 0x606060 });
}