import { Group, Mesh, Plane, PlaneGeometry, Vector3 } from "three";
import { lerp } from "./utils/utils.js";
import { ct_material } from "./shaderMaterials.js";

const cfg = {
    x_range: [-50, 75],
    x_size: [80, 25],
    x_color: [0.2, 0.4, 0.9],

    z_range: [-20, 50],
    z_size: [130, 25],
    z_color: [0.2, 0.9, 0.4],
}

let _mesh, stratum;
let clippingPlanes;

export default class Ct {
    constructor(_stratum) {
        stratum = _stratum;
        init();
    }

    get mesh() {
        return _mesh;
    }

    tick(delta) {
        _mesh.children[0].material.uniforms.uTime.value += delta;
        _mesh.children[1].material.uniforms.uTime.value += delta;
    }

    showLayer = i => stratum.children[i].visible = true;

    hideLayer = i => stratum.children[i].visible = false;

    clippingX = pct => clippingXPlane(pct);
    clippingZ = pct => clippingZPlane(pct);
}

function init() {
    setupClippingPlanes();
    createScanMeshes();
}

function setupClippingPlanes() {
    clippingPlanes = [];
    clippingPlanes.push(new Plane(new Vector3(-1, 0, 0), cfg.x_range[1]));
    clippingPlanes.push(new Plane(new Vector3(0, 0, -1), cfg.z_range[1]));
    stratum.children.forEach(s => s.material.clippingPlanes = clippingPlanes);
}

function createScanMeshes() {
    _mesh = new Group();
    _mesh.add(meshX, meshZ);
}

const meshX = (() => {
    const geom = new PlaneGeometry(cfg.x_size[0], cfg.x_size[1]);
    geom.rotateY(Math.PI / 2);

    const mesh = new Mesh(geom, ct_material);

    mesh.material.uniforms.uSize.value.set(cfg.x_size[0], cfg.x_size[1]);
    mesh.material.uniforms.uColor.value.set(cfg.x_color[0], cfg.x_color[1], cfg.x_color[2]);
    mesh.visible = false;

    mesh.position.set(cfg.x_range[1], 10, 17);

    return mesh;
})();

const meshZ = (() => {
    const geom = new PlaneGeometry(cfg.z_size[0], cfg.z_size[1]);
    const mesh = new Mesh(geom, ct_material.clone());

    mesh.material.uniforms.uSize.value.set(cfg.z_size[0], cfg.z_size[1]);
    mesh.material.uniforms.uColor.value.set(cfg.z_color[0], cfg.z_color[1], cfg.z_color[2]);
    mesh.visible = false;

    mesh.position.set(14, 10, cfg.z_range[0]);

    return mesh;
})();

function clippingXPlane(pct) {
    const x = lerp(cfg.x_range[0], cfg.x_range[1], pct);
    clippingPlanes[0].constant = x;
    _mesh.children[0].position.setX(x);
    _mesh.children[0].visible = pct < 0.99;
}

function clippingZPlane(pct) {
    const z = lerp(cfg.z_range[1], cfg.z_range[0], pct);
    clippingPlanes[1].constant = z;
    _mesh.children[1].position.setZ(z);
    _mesh.children[1].visible = pct > 0.01;
}
