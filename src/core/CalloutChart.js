import {
    BufferGeometry, CircleGeometry,
    DoubleSide,
    Group,
    LineBasicMaterial, LineSegments,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    Vector2,
    Vector3
} from "three";
import { randomVec3 } from "./utils/utils.js";

const FRAME_SIZE = new Vector2(4, 1);
const FRAME_POS = new Vector3(1.7, 2.3, 0);
const FRAME_ROAM_BOX = new Vector3(0.5, 0.5, 0.5);
const HANDLE_ROAM_BOX = new Vector3(1, 0.5, 1);

let camera, meshes, frame, handle;

export default class CalloutChart {
    constructor(_camera) {
        camera = _camera;
        initialize()
    }

    get mesh() {
        return meshes;
    }

    tick(delta) {
        keepSize();
        roam(delta);
    }
}

function initialize() {
    meshes = new Group();
    createFrameMesh();
    createHandleMesh();
    initRoamParams();
}

function createFrameMesh() {
    const geom = new PlaneGeometry(FRAME_SIZE.x, FRAME_SIZE.y, 1, 1);
    const mat = new MeshBasicMaterial({ side: DoubleSide, transparent: true });
    const mesh = new Mesh(geom, mat);

    mesh.position.set(FRAME_SIZE.x / 2 + FRAME_POS.x, FRAME_SIZE.y / 2 + FRAME_POS.y, 0);

    meshes.add(mesh);
}

function createHandleMesh() {
    const source = new Vector3(0, 0.05, 0);
    const target = FRAME_POS.clone().add(new Vector3(-0, -0, 0));
    const mid = new Vector3().lerpVectors(source, target, 0.5);

    const points = [];
    points.push(target);
    points.push(target.clone().add(new Vector3(0, FRAME_SIZE.y, 0)));

    points.push(target);
    points.push(target.clone().add(new Vector3(FRAME_SIZE.x, 0, 0)));

    points.push(target);
    points.push(mid);

    points.push(mid);
    points.push(source);

    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
    const mesh1 = new LineSegments(geometry, material);

    const circleMaterial = new MeshBasicMaterial({ color: 0xffffff });
    const circleGeometry = new CircleGeometry(0.06, 8);

    const mesh2 = new Mesh(circleGeometry, circleMaterial);
    mesh2.position.copy(mid);
    const mesh3 = new Mesh(circleGeometry, circleMaterial);
    mesh3.position.copy(source);

    meshes.add(mesh1, mesh2, mesh3);
}

function initRoamParams() {
    frame = {};
    frame.mesh = meshes.children[0];
    frame.displace = new Vector3(0, 0, 0);
    frame.speed = randomVec3().multiplyScalar(0.5);

    handle = {};
    handle.mesh1 = meshes.children[1];
    handle.mesh2 = meshes.children[2];
    handle.displace = new Vector3(0, 0, 0);
    handle.speed = randomVec3().multiplyScalar(1);
}

function roam(delta) {
    const frameDelta = frame.speed.clone().multiplyScalar(delta);
    frame.displace.add(frameDelta);

    if (Math.abs(frame.displace.x) > FRAME_ROAM_BOX.x) frame.speed.x *= -1;
    if (Math.abs(frame.displace.y) > FRAME_ROAM_BOX.y) frame.speed.y *= -1;
    if (Math.abs(frame.displace.z) > FRAME_ROAM_BOX.z) frame.speed.z *= -1;

    frame.mesh.position.add(frameDelta);

    const handleDelta = handle.speed.clone().multiplyScalar(delta);
    handle.displace.add(handleDelta);
    if (Math.abs(handle.displace.x) > HANDLE_ROAM_BOX.x) handle.speed.x *= -1;
    if (Math.abs(handle.displace.y) > HANDLE_ROAM_BOX.y) handle.speed.y *= -1;
    if (Math.abs(handle.displace.z) > HANDLE_ROAM_BOX.z) handle.speed.z *= -1;

    const points = handle.mesh1.geometry.attributes.position.array;
    for (let i = 0; i < 5; i++) {
        points[i * 3] += frameDelta.x;
        points[i * 3 + 1] += frameDelta.y;
        points[i * 3 + 2] += frameDelta.z;
    }
    for (let i = 5; i < 7; i++) {
        points[i * 3] += handleDelta.x;
        points[i * 3 + 1] += handleDelta.y;
        points[i * 3 + 2] += handleDelta.z;
    }
    handle.mesh1.geometry.attributes.position.needsUpdate = true;

    handle.mesh2.position.add(handleDelta);
}

function keepSize() {
    camera.type === 'OrthographicCamera' ? keepSizeOrthographic() : keepSizePerspective();
}

function keepSizeOrthographic() {
    // keep size while camera zoom
    const sizeFactor = (camera.top - camera.bottom) / camera.zoom * 0.025;
    meshes.scale.set(1, 1, 1).multiplyScalar(sizeFactor);

    // face camera
    meshes.quaternion.copy(camera.quaternion);
}

function keepSizePerspective() {
    // TODO
}