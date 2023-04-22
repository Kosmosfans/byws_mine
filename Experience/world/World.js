import { createCamera } from '../components/camera.js';
import { createLights } from "../components/lights.js";
import { createScene } from '../components/scene.js';

import { createControls } from '../systems/controls.js';
import { createRenderer } from '../systems/renderer.js';

import { loadMineModel } from "../components/coleModel.js";

import Resizer from '../systems/Resizer.js';
import Loop from '../systems/Loop.js';
import ClipManager from "../systems/ClipManager.js";
import Personnel from "../components/Personnel.js";
import TunnelGraph from "../core/TunnelGraph.js";
import GraphParticleSystem from "../core/GraphParticleSystem.js";
import CoalGraph from "../core/CoalGraph.js";

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

        const controls = createControls(camera, renderer.domElement);
        loop.updatables.push(controls);

        const psTunnel = new GraphParticleSystem(new TunnelGraph(), 8000, 0.0008,0xbdff00);
        scene.add(psTunnel.getMesh());
        loop.updatables.push(psTunnel);

        const psCoal = new GraphParticleSystem(new CoalGraph(), 10000, 0.001, 0x000000);
        scene.add(psCoal.getMesh());
        loop.updatables.push(psCoal);

        new Resizer(container, camera, renderer);
    }

    async init() {
        const gltf = await loadMineModel();
        scene.add(gltf.scene);

        const clipManager = new ClipManager(gltf);
        loop.updatables.push(clipManager);
        clipManager.playAllAnimations();

        const personnel = new Personnel(gltf);
        loop.updatables.push(personnel);

        loop.start();
    }
}

export { World };