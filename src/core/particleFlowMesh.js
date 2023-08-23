import { BoxGeometry, Color, IcosahedronGeometry, InstancedMesh, MeshPhongMaterial } from "three";

export default function particleFlowMesh(count, size) {
    return new InstancedMesh(geom(size), mat, count);
}

function geom(s) {
    // return new BoxGeometry(s, s, s, 1, 1, 1);
    return new IcosahedronGeometry(s / 1.1);
}

const mat = new MeshPhongMaterial({
    color: new Color(0.2, 0.2, 0.2)
});