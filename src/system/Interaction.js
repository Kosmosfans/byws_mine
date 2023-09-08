import { Raycaster, Vector2 } from "three";
import MESH_ATTR from '/src/cfg/mesh_attr.json' assert { type: 'JSON' };
import Highlight from "../core/Highlight.js";
import initCallout from "../components/callouts";

let camera, scene, callout, highlighter;
let mouse, rayCaster, currentPick;
let needCheck, intractable;

class Interaction {
    constructor(_camera, _scene, _callout) {
        camera = _camera;
        scene = _scene;
        callout = _callout;

        init();
    }

    tick(delta) {
        checkInteraction();
        highlighter.tick(delta);
    }
}

function init() {
    mouse = new Vector2();
    rayCaster = new Raycaster();

    initInteractableMeshes();
    highlighter = new Highlight();
    setupListeners();
}

function checkInteraction() {
    // no need to check until mouse moved
    if (!needCheck) return;

    const picked = checkMousePick();
    picked ? highlight(picked) : clear();

    needCheck = false;
}

function initInteractableMeshes() {
    intractable = [];
    scene.traverse(m => MESH_ATTR[m.name] && MESH_ATTR[m.name]['interactable'] ? intractable.push(m) : {});
}

function checkMousePick() {
    rayCaster.setFromCamera(mouse, camera);
    const intersects = rayCaster.intersectObjects(intractable);
    return intersects.length > 0 ? intersects[0].object : null;
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
    document.addEventListener('click', (event) => onClick(event));
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    needCheck = true;
}

function onClick() {
    // const panel = document.querySelector(".info-panel");
    // currentPicked ? panel.style.right = '0' : panel.style.right = '-33%';
}

export default function initInteraction(world) {
    const callout = initCallout(world);
    const interaction = new Interaction(world.camera, world.scene, callout);

    world.registerUpdatable(interaction);
}