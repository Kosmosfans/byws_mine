import tunnels from '/src/data/tunnels.json' assert { type: 'JSON' };

import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";
import { convertCoordsFromGLTFToThree } from "./utils/utils.js";

let positions, uvs, colors, velocities, width;

export default function createTunnelGeometry(tunnelWidth) {
    width = tunnelWidth;

    positions = [];
    uvs = [];
    colors = [];
    velocities = [];

    Object.values(tunnels).forEach(t => tunnelGeometry(t));

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geometry.setAttribute('speed', new Float32BufferAttribute(velocities, 1));

    geometry.computeBoundingBox();

    return geometry;
}

function tunnelGeometry(t) {
    const a = convertCoordsFromGLTFToThree(t.start);
    const b = convertCoordsFromGLTFToThree(t.end);

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

    velocities.push(0, 0, 0, 0, 0, 0);

    colors.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
}

function calcTunnelPlane(a, b) {
    const ba = b.clone().sub(a);
    const len = ba.length();

    const axisY = new Vector3(0, 1, 0);
    const halfWidthVec = ba.clone().applyAxisAngle(axisY, Math.PI / 2).normalize().multiplyScalar(width);

    const a0 = a.clone().sub(halfWidthVec);
    const a1 = a.clone().add(halfWidthVec);
    const b0 = b.clone().sub(halfWidthVec);
    const b1 = b.clone().add(halfWidthVec);

    return { a0, a1, b0, b1, len };
}