import initCamera from './camera.js';
import initScene from './scene.js';
import initResizer from "./resizer.js";
import initCameraControl from './cc.js';
import initRenderer from './renderer.js';
import initContainer from "./container";
import initLoop from './Loop.js';
import initGltfClips from "./clips.js";
import setupModels from "../modules/models.js";
import initTriggers from "./triggers.js";
import initLights from "./lights";
import initAssets from "../modules/assets.js";

export default class World {

    async init() {
        //system
        this.container = initContainer();
        this.camera = initCamera();
        this.scene = initScene();
        this.renderer = initRenderer(this);
        this.loop = initLoop(this);
        this.cc = initCameraControl(this);

        initLights(this);
        initResizer(this);

        // load models
        this.gltf = await setupModels();

        // static animations
        initGltfClips(this);
        initAssets(this);

        // controls
        initTriggers(this);
    }

    start() {
        this.loop.start();
    }

    add(obj) {
        this.scene.add(obj);
    }

    remove(obj) {
        this.scene.remove(obj);
    }

    registerUpdatable(obj) {
        this.loop.registerUpdatable(obj);
    }

    removeUpdatable(obj) {
        this.loop.removeUpdatable(obj);
    }
}