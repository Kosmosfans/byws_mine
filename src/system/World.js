import initCamera from './camera.js';
import initScene from './scene.js';
import initResizer from "./resizer.js";
import initMouseControl from './controls.js';
import initRenderer from './renderer.js';
import initContainer from "./container";
import initLoop from './Loop.js';
import initClips from "./animation.js";
import initInteraction from "./Interaction.js";

import initModels from "../components/models.js";
import { initCloudStyleFlow, initParticleStyleFlow } from "../components/flows.js";
import initTriggers from "./triggers.js";
import { initPersonnel } from "../components/personnel";

export default class World {
    constructor() {
        this.container = initContainer();
        this.camera = initCamera();
        this.scene = initScene();
        this.renderer = initRenderer(this);
        this.loop = initLoop(this);

        initMouseControl(this);
        initResizer(this);
        initTriggers(this);
    }

    async init() {
        this.gltf = await initModels(this);
        initInteraction(this);
        initClips(this);

        // initCloudStyleFlow(this);
        // initParticleStyleFlow(this);

        initPersonnel(this);
    }

    start() {
        this.loop.start();
    }

    add(obj) {
        this.scene.add(obj);
    }

    registerUpdatable(obj) {
        this.loop.registerUpdatable(obj);
    }
}