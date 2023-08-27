import { randRange } from "../../core/utils/utils.js";
import { Vector3 } from "three";

const MIN_X = -30;
const MAX_X = 60;

const MIN_Y = 0;
const MAX_Y = 25;

const MIN_Z = -0;
const MAX_Z = 50;

export function seismicUpdate() {
    const locX = randRange(MIN_X, MAX_X);
    const locY = randRange(MIN_Y, MAX_Y);
    const locZ = randRange(MIN_Z, MAX_Z);

    return new Vector3(locX, locY, locZ);
}
