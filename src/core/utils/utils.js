import { Vector3 } from "three";

export function randomVec3() {
    return new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
}

export function convertCoordsFromGLTFToThree(v) {
    // from gltf model to threejs. rotate -90 along x axis.
    // threejs.x = model.x; threejs.y = model.z; threejs.z = -model.y
    return new Vector3(v.x, v.z, -v.y);
}

export function randInt(a) {
    return Math.floor(Math.random() * a);
}

export function rand() {
    return Math.random();
}

export function range(a) {
    return [...Array(a).keys()];
}

export function reflect(a) {
    a = a < 0 ? -a : a;
    a = a > 1 ? 2 - a : a;
    return a;
}

export function outside(a, min, max) {
    return a > max || a < min;
}