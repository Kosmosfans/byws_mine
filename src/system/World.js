import initCamera from './camera.js';
import initScene from './scene.js';
import initResizer from "./resizer.js";
import initCameraControl from './controls2.js';
import initRenderer from './renderer.js';
import initContainer from "./container";
import initLoop from './Loop.js';
import initGltfClips from "./clips.js";
import initInteraction from "../components/interactions.js";

import initModels from "../components/models.js";
import { initCloudStyleFlow } from "../components/airFlows.js";
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
import initMonitor from "../components/monitors";
import initNavigator from "../components/navigators.js";
import initShaderObjs from "../components/shaderObjs.js";
import initTunnelDetail from "../components/tunnelDetails.js";

const modules = {
    'flow': { 'loader': initCloudStyleFlow },
    'personnel': { 'loader': initPersonnel },
    'coal': { 'loader': initCoalFlow },
    'tram': { 'loader': initTrams },
    'electro': { 'loader': initElectro },
    'seismic': { 'loader': initSeismic },
    'surveillance': { 'loader': initSurveillance },
    'patrol': { 'loader': initPatrol },
    'monitor': { 'loader': initMonitor },
    'navigator': { 'loader': initNavigator },
    'tunnel': { 'loader': initTunnelDetail }
}

export default class World {

    constructor() {
        initWorld(this);
    }

    async init() {
        await setupGltf(this);

        initStaticAnimations(this);
        initControls(this);
    }

    start() {
        this['loop'].start();
    }

    add(obj) {
        this['scene'].add(obj);
    }

    remove(obj) {
        this['scene'].remove(obj);
    }

    setModule(id) {
        Object.keys(modules).forEach(m => m === id ? activateModule(this, m) : deactivateModule(this, m));
    }

    registerUpdatable(obj) {
        this['loop'].registerUpdatable(obj);
    }

    removeUpdatable(obj) {
        this['loop'].removeUpdatable(obj);
    }
}

function initWorld(world) {
    world.container = initContainer();
    world.camera = initCamera();
    world.scene = initScene();
    world.renderer = initRenderer(world);
    world.loop = initLoop(world);
    world.cc = initCameraControl(world);

    initLights(world);
    initResizer(world);
}

async function setupGltf(world) {
    world.gltf = await initModels(world);
}

function initStaticAnimations(world) {
    initGltfClips(world);
    initShaderObjs(world);
}

function initControls(world) {
    initTriggers(world);
    world.interaction = initInteraction(world);
    initApi(world);
}

function activateModule(world, id) {
    if (!modules[id]) return;
    if (!modules[id].instance) modules[id].instance = modules[id].loader(world);

    world.add(modules[id].instance.mesh);
    world.registerUpdatable(modules[id].instance);
}

function deactivateModule(world, id) {
    if (!modules[id] || !modules[id].instance) return;

    world.remove(modules[id].instance.mesh);
    world.removeUpdatable(modules[id].instance);
}