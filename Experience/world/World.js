import { createCamera } from '../components/camera.js';
import { createLights } from "../components/lights.js";
import { createSky } from "../components/skyDome.js";
import { createScene } from '../components/scene.js';

import { createControls } from '../systems/controls.js';
import { createRenderer } from '../systems/renderer.js';

import { loadModel } from "../components/coleModel.js";

import Resizer from '../systems/Resizer.js';
import Loop from '../systems/Loop.js';

let camera;
let renderer;
let scene;
let loop;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);

        const { directionalLight, ambientLight } = createLights();
        scene.add(directionalLight, ambientLight);

        // const { light, sky } = createSky();
        // scene.add(light, sky);

        const controls = createControls(camera, renderer.domElement);
        loop.updatables.push(controls);

        new Resizer(container, camera, renderer);
    }

    async init() {
        const model = await loadModel();
        scene.add(model);
        loop.start();
    }
}

export { World };