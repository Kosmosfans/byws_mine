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

export function rand(a = 0, b = 1) {
    return a + Math.random() * (b - a);
}

export function range(a) {
    return [...Array(a).keys()];
}

export function reflect(a, edge0 = 0, edge1 = 1) {
    a = a < edge0 ? 2 * edge0 - a : a;
    a = a > edge1 ? 2 * edge1 - a : a;
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

export function deleteObject3D(obj) {
    if (obj.children) obj.children.forEach(c => deleteObject3D(c));
    if (obj.parent) obj.parent.remove(obj);

    if (!obj.isMesh) return;

    obj.geometry.dispose();
    obj.material.dispose();
}

export function calcPlaneWith2EndPoint(a, b, width) {
    const ba = b.clone().sub(a);
    const len = ba.length();

    const axisY = new Vector3(0, 1, 0);
    const normal = axisY.cross(ba).normalize().multiplyScalar(width);

    const a0 = a.clone().sub(normal);
    const a1 = a.clone().add(normal);
    const b0 = b.clone().sub(normal);
    const b1 = b.clone().add(normal);

    return { a0, a1, b0, b1, len };
}

export function lerp(a, b, alpha) {
    return a + alpha * (b - a);
}