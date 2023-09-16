import scenarios from "./scenarios.js";
import World from "./World.js";
import modules from "./modules.js";
import ui from "./ui.js";
import initInteraction from "../modules/interactions";
import { setCamera } from "./cc.js";

let world, interaction;

function start() {
    world = new World();
    world.init().then(() => startApp());
}

function startApp() {
    world.start();
    interaction = initInteraction(world);
    ui.init();
}

function enableInteraction() {
    interaction ? interaction.enable() : {};
}

function disableInteraction() {
    interaction ? interaction.disable() : {};
}

function setModule(id) {
    modules.setModule(id, world);
}

function setScenario(id) {
    scenarios.setScenario(id, world);
}

function setCameraState(state) {
    setCamera(state);
}

function showStratumLayer(i) {
    const ct = modules.getModule('ct');
    ct ? ct.showLayer(i) : {};
}

function hideStratumLayer(i) {
    const ct = modules.getModule('ct');
    ct ? ct.hideLayer(i) : {};
}

function setFlowMaterial(i) {
    const flow = modules.getModule('air');
    flow ? flow.setMaterial(i) : {};
}

function enableClipping() {
    world.renderer.localClippingEnabled = true;
}

function disableClipping() {
    world.renderer.localClippingEnabled = false;
}

function ctClippingX(pct) {
    const ct = modules.getModule('ct');
    ct ? ct.clippingX(pct) : {};
}

function ctClippingZ(pct) {
    const ct = modules.getModule('ct');
    ct ? ct.clippingZ(pct) : {};
}

export default {
    start,
    setCameraState,
    setModule,
    setScenario,
    enableInteraction,
    disableInteraction,
    showStratumLayer,
    hideStratumLayer,
    setFlowMaterial,
    enableClipping,
    disableClipping,
    ctClippingX,
    ctClippingZ,
}