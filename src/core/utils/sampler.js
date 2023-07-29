import tunnel_raw from "../../data/tunnels.json";
import { convertCoordsFromGLTFToThree, rand, randInt } from "./utils.js";
import { Vector3 } from "three";

const tunnels = [...Object.values(tunnel_raw)];

export function sampleTunnel() {
    const idx = randInt(tunnels.length);
    const prop = rand();
    const pos = getPosition(idx, prop);

    return { tunnelIdx: idx, proportion: prop, position: pos };
}

export function getPosition(tunnelIdx, proportion) {
    const v1 = new Vector3(tunnels[tunnelIdx].start.x, tunnels[tunnelIdx].start.y, tunnels[tunnelIdx].start.z);
    const v2 = new Vector3(tunnels[tunnelIdx].end.x, tunnels[tunnelIdx].end.y, tunnels[tunnelIdx].end.z);
    v1.lerp(v2, proportion);
    return convertCoordsFromGLTFToThree(v1);
}

export function tunnelDiff(tunnelIdx) {
    const v1 = new Vector3(tunnels[tunnelIdx].start.x, tunnels[tunnelIdx].start.y, tunnels[tunnelIdx].start.z);
    const v2 = new Vector3(tunnels[tunnelIdx].end.x, tunnels[tunnelIdx].end.y, tunnels[tunnelIdx].end.z);
    return convertCoordsFromGLTFToThree(v2.sub(v1));
}