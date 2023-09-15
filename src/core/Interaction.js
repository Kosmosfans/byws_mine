import { Raycaster, Vector2 } from "three";
import MESH_ATTR from '/src/config/mesh_attr.json' assert { type: 'JSON' };
import Highlight from "./Highlight.js";

let camera, scene, callout, highlighter;
let mouse, rayCaster, currentPick;
let needCheck, interactables, enabled;

export default class Interaction {
    constructor(_camera, _scene, _callout) {
        camera = _camera;
        scene = _scene;
        callout = _callout;

        init();
    }

    tick(delta) {
        if (!enabled) return;

        checkInteraction();
        highlighter.tick(delta);
    }

    enable() {
        enabled = true;
    }

    disable() {
        enabled = false;
    }
}

function init() {
    mouse = new Vector2();
    rayCaster = new Raycaster();

    initInteractableMeshes();
    highlighter = new Highlight();
    setupListeners();

    enabled = true;
}

function checkInteraction() {
    // no need to check until mouse moved
    if (!needCheck) return;

    const picked = checkMousePick();
    picked ? highlight(picked) : clear();

    needCheck = false;
}

function initInteractableMeshes() {
    interactables = [];

    scene.traverse(mesh => {
        if (!MESH_ATTR[mesh.name] || !MESH_ATTR[mesh.name].interactable) return null;
        mesh.userData.desc = MESH_ATTR[mesh.name].desc;
        interactables.push(mesh);
    })
}

function checkMousePick() {
    rayCaster.setFromCamera(mouse, camera);
    const intersects = rayCaster.intersectObjects(interactables);
    return intersects.length > 0 && intersects[0].object.visible ? intersects[0].object : null;
}

function highlight(object) {
    if (currentPick === object) return;

    clear();
    currentPick = object;
    highlighter.setTarget(object);
    callout.setTarget(object);
}

function clear() {
    if (!currentPick) return;

    highlighter.clear();
    callout.clear();
    currentPick = null;
}

function setupListeners() {
    document.addEventListener('pointermove', (event) => onMouseMove(event));
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    needCheck = true;
}
