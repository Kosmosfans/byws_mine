import { Euler, Quaternion, Vector3 } from "three";

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

export function randRange(a, b) {
    return a + rand() * (b - a);
}

export function reflect(a) {
    a = a < 0 ? -a : a;
    a = a > 1 ? 2 - a : a;
    return a;
}

export function outside(a, min, max) {
    return a > max || a < min;
}

export function clamp(a, min, max) {
    return a > max ? max : (a < min ? min : a);
}

export function len(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function binarySearch(arr, val, start, end) {
    if (val < arr[start]) return start;
    if (end - start <= 1) return end;

    const mid = Math.floor((start + end) / 2);
    return val > arr[mid] ? binarySearch(arr, val, mid, end) : binarySearch(arr, val, start, mid);
}

export function randArray(len, max) {
    const result = [];
    for (let i = 0; i < len; i++) result.push((rand() - 0.5) * max);
    return result;
}

export function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
