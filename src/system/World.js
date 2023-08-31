import initCamera from './camera.js';
import initScene from './scene.js';
import initResizer from "./resizer.js";
import initCameraControl from './controls2.js';
import initRenderer from './renderer.js';
import initContainer from "./container";
import initLoop from './Loop.js';
import initClips from "./clips.js";
import initInteraction from "./Interaction.js";

import initModels from "../components/models.js";
import {
    initBillowingStyleFlow,
    initCloudStyleFlow,
    initDropStyleFlow,
    initFlameStyleFlow,
    initParticleStyleFlow
} from "../components/airFlows.js";
import initTriggers from "./triggers.js";
import initPersonnel from "../components/personnel";
import initApi from "./api.js";
import initCoalFlow from "../components/coalFlows.js";
import initLights from "./lights";
import initTrams from "../components/trams";
import initElectro from "../components/electros.js";
import initSeismic from "../components/seismics";
import initSurveillance from "../components/surveillances.js";
import initPatrol from "../components/patrols.js";

export default class World {

    constructor() {
        this.container = initContainer();
        this.camera = initCamera();
        this.scene = initScene();
        this.renderer = initRenderer(this);
        this.loop = initLoop(this);
        this.cc = initCameraControl(this);

        initLights(this);
        initResizer(this);
        initTriggers(this);
    }

    async init() {
        this.gltf = await initModels(this);

        // this.flow = initParticleStyleFlow(this);
        // this.flow = initCloudStyleFlow(this);
        // this.flow = initFlameStyleFlow(this);
        // this.flow = initDropStyleFlow(this);
        this.flow = initBillowingStyleFlow(this);

        this.personnel = initPersonnel(this);
        this.coal = initCoalFlow(this);
        this.tram = initTrams(this);
        this.electro = initElectro(this);
        this.seismic = initSeismic(this);
        this.surveillance = initSurveillance(this);
        this.patrol = initPatrol(this);

        initInteraction(this);
        initClips(this);
        initApi(this);
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

    removeUpdatable(obj) {
        this.loop.updatables.delete(obj);
    }
}
