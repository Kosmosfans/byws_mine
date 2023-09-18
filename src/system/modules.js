import initAirFlow from "../modules/air.js";
import initPersonnel from "../modules/personnel.js";
import initCoalFlow from "../modules/coal.js";
import initTrams from "../modules/tram.js";
import initElectro from "../modules/electro.js";
import initSeismic from "../modules/seismic.js";
import initSurveillance from "../modules/surveillance.js";
import initPatrol from "../modules/patrol.js";
import initMonitor from "../modules/monitor.js";
import initNavigator from "../modules/navigator.js";
import initTunnelDetail from "../modules/detail.js";
import initCt from "../modules/ct.js";

let active = null;

const modules = {
    'air': { 'loader': initAirFlow },
    'personnel': { 'loader': initPersonnel },
    'coal': { 'loader': initCoalFlow },
    'tram': { 'loader': initTrams },
    'electro': { 'loader': initElectro },
    'surveillance': { 'loader': initSurveillance },
    'patrol': { 'loader': initPatrol },
    'monitor': { 'loader': initMonitor },
    'navigator': { 'loader': initNavigator },
    'detail': { 'loader': initTunnelDetail },

    'ct': { 'loader': initCt },
    'seismic': { 'loader': initSeismic },
}

function setModule(id, world) {
    if (!modules[id] || active === id) return;
    if (!modules[id].instance) modules[id].instance = modules[id].loader(world);

    close(active, world);

    world.add(modules[id].instance.mesh);
    world.registerUpdatable(modules[id].instance);
    active = id;
}

function close(id, world) {
    if (!modules[id] || !modules[id].instance) return;

    world.remove(modules[id].instance.mesh);
    world.removeUpdatable(modules[id].instance);
    active = null;
}

function getModule(id) {
    return modules[id].instance;
}

export default {
    setModule,
    getModule,
}