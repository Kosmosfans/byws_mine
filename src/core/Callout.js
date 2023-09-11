import { Vector3 } from "three";
import CalloutChart from "./CalloutChart.js";

export default class Callout {

    static instance;

    constructor(camera) {
        if (Callout.instance) return Callout.instance;

        this.chart = new CalloutChart(camera);
        this.clear();
        Callout.instance = this;
    }

    get mesh() {
        return this.chart.mesh;
    }

    setTarget(target) {
        this.chart.setTitle(target.userData.desc);
        this.#showOn(target);
    }

    clear() {
        this.chart.mesh.visible = false;
        this.chart.mesh.position.set(-1000, 0, 0);
    }

    tick(delta) {
        if (this.chart.mesh.visible) this.chart.tick(delta);
    }

    #showOn(target) {
        let pos = new Vector3();
        target.getWorldPosition(pos);
        this.chart.mesh.position.copy(pos);
        this.chart.mesh.visible = true;
    }
}