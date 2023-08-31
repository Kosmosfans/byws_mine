import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";
import { convertCoordsFromGLTFToThree } from "./utils/utils.js";

let positions, uvs, width;

export default function createTunnelGeometry(tunnels, _width, covertCoords = true) {
    width = _width;

    positions = [];
    uvs = [];

    Object.values(tunnels).forEach(t => tunnelGeometry(t, covertCoords));

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('color', new Float32BufferAttribute(new Float32Array(positions.length), 3));
    geometry.setAttribute('speed', new Float32BufferAttribute(new Float32Array(uvs.length / 2), 1));

    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    return geometry;
}

function tunnelGeometry(t, convertCoords) {
    const a = convertCoords ? convertCoordsFromGLTFToThree(t.start) : new Vector3(t.start.x, t.start.y, t.start.z);
    const b = convertCoords ? convertCoordsFromGLTFToThree(t.end) : new Vector3(t.end.x, t.end.y, t.end.z);

    const { a0, a1, b0, b1, len } = calcTunnelPlane(a, b);

    positions.push(a1.x, a1.y, a1.z);
    positions.push(a0.x, a0.y, a0.z);
    positions.push(b0.x, b0.y, b0.z);

    positions.push(b0.x, b0.y, b0.z);
    positions.push(b1.x, b1.y, b1.z);
    positions.push(a1.x, a1.y, a1.z);

    uvs.push(1, 0);
    uvs.push(0, 0);
    uvs.push(0, len);

    uvs.push(0, len);
    uvs.push(1, len);
    uvs.push(1, 0);
}

function calcTunnelPlane(a, b) {
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