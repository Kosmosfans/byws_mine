import { TextureLoader, Vector3 } from "three";
import MESH_ATTR from '/src/data/mesh_attr.json' assert { type: 'JSON' };
import CalloutChart from "./CalloutChart.js";

let chart, titles;

export default class Callout {
    constructor(camera) {
        loadTitles();
        chart = new CalloutChart(camera);
        clear();
    }

    get mesh() {
        return chart.mesh;
    }

    setTarget(target) {
        setTitle(target.name);
        showOn(target);
    }

    clear() {
        clear();
    }

    tick(delta) {
        if (chart.mesh.visible) chart.tick(delta);
    }
}

function clear() {
    chart.mesh.visible = false;
    chart.mesh.position.set(-1000, 0, 0);
}

function setTitle(name) {
    chart.mesh.children[0].material.map = titles.get(name);
    chart.mesh.children[0].material.needsUpdate = true;
}

function showOn(target) {
    let pos = new Vector3();
    target.getWorldPosition(pos);
    chart.mesh.position.copy(pos);
    chart.mesh.visible = true;
}

function loadTitles() {
    titles = new Map();
    Object.keys(MESH_ATTR).filter(k => MESH_ATTR[k]["interactable"]).forEach(f => loadTitle(f));
}

function loadTitle(f) {
    const titleFile = '/images/title_' + f + '.png';
    titles.set(f, new TextureLoader().load(titleFile));
}
