import { rand, randInt, range } from "../../core/utils/utils.js";
import { sampleTunnel } from "../../core/utils/sampler.js";
import { Vector3 } from "three";

const COUNT = 200;

export function personnelInit() {
    return range(COUNT).map(() => personInfo());
}

function personInfo() {
    const sample = sampleTunnel();
    const inactive = rand() > 0.5;
    const type = rand() > 0.1 ? 0 : 1;

    const dummy = {};
    dummy.tunnelIdx = sample.tunnelIdx;
    dummy.proportion = sample.proportion;
    dummy.position = inactive ? new Vector3(0, -9999, 0) : sample.position;
    dummy.inactive = inactive;
    dummy.type = type;

    return dummy;
}

export function personnelUpdate() {
    return new Set(range(10).map(() => randInt(COUNT)));
}