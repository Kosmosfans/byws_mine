import { TextureLoader, Vector3 } from "three";
import MESH_ATTR from '/src/data/static/mesh_attr.json' assert { type: 'JSON' };
import CalloutChart from "./CalloutChart.js";

let chart, titles;

export default class Callout {
    constructor(camera) {
        initTitles();
        chart = new CalloutChart(camera);
        this.clear();
    }

    get mesh() {
        return chart.mesh;
    }

    setTarget(target) {
        setTitle(target.name);
        showOn(target);
    }

    clear() {
        chart.mesh.visible = false;
        chart.mesh.position.set(-1000, 0, 0);
    }

    tick(delta) {
        if (chart.mesh.visible) chart.tick(delta);
    }
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

function initTitles() {
    titles = new Map();
    Object.keys(MESH_ATTR).filter(k => MESH_ATTR[k]["interactable"]).forEach(f => loadTitle(f));
}

function loadTitle(f) {
    const titleFile = '/images/title_' + f + '.png';
    titles.set(f, new TextureLoader().load(titleFile));
}
