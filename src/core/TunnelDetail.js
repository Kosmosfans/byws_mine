import tunnel_raw from "../cfg/tunnels.json" assert { type: "JSON" };
import createTunnelGeometry from "./tunnelGeom.js";
import { Group, Mesh, MeshBasicMaterial, PlaneGeometry, Raycaster, Vector2 } from "three";
import { highlight_material } from "./shaderMaterials.js";
import { calcPlaneWith2EndPoint, convertCoordsFromGLTFToThree } from "./utils/utils.js";

let _mesh, width, callout, highlighter;
let camera, mouse, rayCaster, needCheck;
let tunnelData, currentPick;

export default class TunnelDetail {
    constructor(_width, _callout, _camera) {
        width = _width;
        callout = _callout;
        camera = _camera;

        init();
    }

    get mesh() {
        return _mesh;
    }

    tick(delta) {
        checkInteraction();
        if (highlighter.visible) highlighter.material.uniforms.uTime.value += delta;
    }
}

function init() {
    initMeshes();
    initRay();
    initTunnelData();
    setupListener();
}

function initMeshes() {
    const tunnelMesh = new Mesh(createTunnelGeometry(tunnel_raw, width), new MeshBasicMaterial());
    tunnelMesh.visible = false;

    highlighter = new Mesh(new PlaneGeometry(), highlight_material);

    const dummy = new Mesh(new PlaneGeometry(), new MeshBasicMaterial());
    dummy.visible = false;

    _mesh = new Group();
    _mesh.add(tunnelMesh, highlighter, dummy);
}

function initRay() {
    mouse = new Vector2();
    rayCaster = new Raycaster();
}

function initTunnelData() {
    tunnelData = Object.keys(tunnel_raw);
}

function setupListener() {
    document.addEventListener('pointermove', (event) => onMouseMove(event));
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    needCheck = true;
}

function checkInteraction() {
    // no need to check until mouse moved
    if (!needCheck) return;

    const intersects = checkIntersects();
    intersects.length ? highlight(intersects[0]) : clear();

    needCheck = false;
}

function checkIntersects() {
    rayCaster.setFromCamera(mouse, camera);
    return rayCaster.intersectObjects([_mesh.children[0]]);
}

function highlight(picked) {
    const tunnelIdx = Math.floor(picked.faceIndex / 2);
    if (currentPick === tunnelIdx) return;

    clear();
    currentPick = tunnelIdx;

    _mesh.children[2].userData.desc = tunnelData[tunnelIdx];
    _mesh.children[2].position.copy(picked.point);
    callout.setTarget(_mesh.children[2]);

    fitHighlighter(tunnelIdx);
}

function fitHighlighter(i) {
    const tunnel = tunnel_raw[tunnelData[i]];
    const start = convertCoordsFromGLTFToThree(tunnel.start);
    const end = convertCoordsFromGLTFToThree(tunnel.end);
    const { a0, a1, b0, b1 } = calcPlaneWith2EndPoint(start, end, width);

    highlighter.geometry.attributes.position.array[0] = a0.x;
    highlighter.geometry.attributes.position.array[1] = a0.y;
    highlighter.geometry.attributes.position.array[2] = a0.z;
    highlighter.geometry.attributes.position.array[3] = a1.x;
    highlighter.geometry.attributes.position.array[4] = a1.y;
    highlighter.geometry.attributes.position.array[5] = a1.z;
    highlighter.geometry.attributes.position.array[6] = b0.x;
    highlighter.geometry.attributes.position.array[7] = b0.y;
    highlighter.geometry.attributes.position.array[8] = b0.z;
    highlighter.geometry.attributes.position.array[9] = b1.x;
    highlighter.geometry.attributes.position.array[10] = b1.y;
    highlighter.geometry.attributes.position.array[11] = b1.z;

    highlighter.visible = true;
    highlighter.geometry.attributes.position.needsUpdate = true;
}

function clear() {
    if (!currentPick) return;

    callout.clear();
    highlighter.visible = false;
    currentPick = null;
}