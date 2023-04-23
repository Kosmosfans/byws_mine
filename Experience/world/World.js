import { createCamera } from '../components/camera.js';
import { createLights } from "../components/lights.js";
import { createScene } from '../components/scene.js';
import { loadMineModel } from "../components/coleModel.js";
import { createAirFlow, createCoalFlow } from "../components/airFlow.js";

import { createControls } from '../systems/controls.js';
import { createRenderer } from '../systems/renderer.js';

import Resizer from '../systems/Resizer.js';
import Loop from '../systems/Loop.js';
import ClipManager from "../systems/ClipManager.js";
import Personnel from "../components/Personnel.js";

let camera;
let renderer;
let scene;
let loop;
let gltf;

export default class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);

        const { directionalLight, ambientLight } = createLights();
        scene.add(directionalLight, ambientLight);

        const controls = createControls(camera, renderer.domElement);
        loop.updatables.push(controls);

        new Resizer(container, camera, renderer);

    }

    async init() {
        await World.#loadModel();
        World.#playClips();

        World.#initPersonnel();
        World.#initAirFlow();
        World.#initCoalFlow();

        loop.start();
    }

    static async #loadModel() {
        gltf = await loadMineModel();
        scene.add(gltf.scene);
    }

    static #playClips() {
        const clipManager = new ClipManager(gltf);
        loop.updatables.push(clipManager);
        clipManager.playAllAnimations();
    }

    static #initPersonnel() {
        const personnel = new Personnel(gltf);
        loop.updatables.push(personnel);
    }

    static #initAirFlow() {
        const airFlow = createAirFlow();
        scene.add(airFlow.mesh);
        loop.updatables.push(airFlow);
    }

    static #initCoalFlow() {
        const coalFlow = createCoalFlow();
        scene.add(coalFlow.mesh);
        loop.updatables.push(coalFlow);
    }
}