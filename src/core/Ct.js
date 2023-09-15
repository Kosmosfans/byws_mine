import { Mesh } from "three";

let _mesh, stratum;

export default class Ct {
    constructor(_stratum) {
        stratum = _stratum;
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick() {
    }

    showLayer(i) {
        stratum[i].visible = true;
    }

    hideLayer(i) {
        stratum[i].visible = false;
    }
}

function init() {
    _mesh = new Mesh();
}