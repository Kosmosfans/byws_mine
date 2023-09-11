import {
    BufferGeometry, CanvasTexture, CircleGeometry,
    Group, LineBasicMaterial, LineSegments,
    Mesh, MeshBasicMaterial, PlaneGeometry, Vector3
} from "three";
import { outside, randomVec3 } from "./utils/utils.js";

const cfg = {
    frame_size: [4, 1],
    frame_pos: [1.7, 2.3, 0],
    box1: [0.5, 0.5, 0.5],
    box2: [1, 0.5, 1],
    canvas_size: [256, 64]
}

let camera, meshes, frame, handle, canvas;

export default class CalloutChart {

    static instance;

    constructor(_camera) {
        if (CalloutChart.instance) return CalloutChart.instance;

        camera = _camera;
        initialize()

        CalloutChart.instance = this;
    }

    get mesh() {
        return meshes;
    }

    tick(delta) {
        keepSize();
        roam(delta);
    }

    setTitle = t => renderChartFrame(t);
}

function initialize() {
    meshes = new Group();
    createFrameMesh();
    createHandleMesh();
    initRoamParams();
}

function createFrameMesh() {
    const geom = new PlaneGeometry(cfg.frame_size[0], cfg.frame_size[1]);
    const mesh = new Mesh(geom, createFrameMaterial());

    mesh.position.set(cfg.frame_size[0] / 2 + cfg.frame_pos[0], cfg.frame_size[1] / 2 + cfg.frame_pos[1], 0);

    meshes.add(mesh);
}

function createFrameMaterial() {
    canvas = document.createElement("canvas");
    canvas.width = cfg.canvas_size[0];
    canvas.height = cfg.canvas_size[1];

    return new MeshBasicMaterial({
        map: new CanvasTexture(canvas),
        transparent: true,
        opacity: 0.7
    });
}

function renderChartFrame(t) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, cfg.canvas_size[0], cfg.canvas_size[1]);

    // bg
    ctx.fillStyle = "#ab684f";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(cfg.canvas_size[0] - 16, 0);
    ctx.lineTo(cfg.canvas_size[0], 16);
    ctx.lineTo(cfg.canvas_size[0], cfg.canvas_size[1]);
    ctx.lineTo(0, cfg.canvas_size[1]);
    ctx.closePath();
    ctx.fill();

    // text
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px hei";
    ctx.fillText(t, 15, 45);

    meshes.children[0].material.map.needsUpdate = true;
}

function createHandleMesh() {
    const source = new Vector3(0, 0.05, 0);
    const target = new Vector3(cfg.frame_pos[0], cfg.frame_pos[1], cfg.frame_pos[2]);
    const mid = new Vector3().lerpVectors(source, target, 0.5);

    const points = [];
    points.push(target);
    points.push(target.clone().add(new Vector3(0, cfg.frame_size[1], 0)));

    points.push(target);
    points.push(target.clone().add(new Vector3(cfg.frame_size[0], 0, 0)));

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

    if (outside(frame.displace.x, -cfg.box1[0], cfg.box1[0])) frame.speed.x *= -1;
    if (outside(frame.displace.y, -cfg.box1[1], cfg.box1[1])) frame.speed.y *= -1;
    if (outside(frame.displace.z, -cfg.box1[2], cfg.box1[2])) frame.speed.z *= -1;

    frame.mesh.position.add(frameDelta);

    const handleDelta = handle.speed.clone().multiplyScalar(delta);
    handle.displace.add(handleDelta);
    if (outside(handle.displace.x, -cfg.box2[0], cfg.box2[0])) handle.speed.x *= -1;
    if (outside(handle.displace.y, -cfg.box2[1], cfg.box2[1])) handle.speed.y *= -1;
    if (outside(handle.displace.z, -cfg.box2[2], cfg.box2[2])) handle.speed.z *= -1;

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