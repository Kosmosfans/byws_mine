import tunnel_raw from "../../config/tunnels.json";
import { binarySearch, convertCoordsFromGLTFToThree, rand, len } from "./utils.js";
import { Vector3 } from "three";

const tunnels = [...Object.values(tunnel_raw)];
const lengths = tunnels.map(t => len(t.start, t.end));
const cumuLengths = lengths.map((sum => v => sum += v)(0));

export function sampleTunnel() {
    const idx = randomTunnel();
    const prop = rand();
    const pos = calcPosition(idx, prop);

    return { tunnelIdx: idx, proportion: prop, position: pos };
}

function randomTunnel() {
    const max = tunnels.length - 1;
    const val = rand() * cumuLengths[max];
    return binarySearch(cumuLengths, val, 0, max);
}

export function calcPosition(tunnelIndex, proportion) {
    const t = tunnels[tunnelIndex];
    const a = new Vector3(t.start.x, t.start.y, t.start.z);
    const b = new Vector3(t.end.x, t.end.y, t.end.z);
    return convertCoordsFromGLTFToThree(a.lerp(b, proportion));
}

export function tunnelDirection(tunnelIndex) {
    const t = tunnels[tunnelIndex];
    const a = new Vector3(t.start.x, t.start.y, t.start.z);
    const b = new Vector3(t.end.x, t.end.y, t.end.z);
    return convertCoordsFromGLTFToThree(b.sub(a));
}