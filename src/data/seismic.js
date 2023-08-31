import { randRange } from "../core/utils/utils.js";
import { Vector3 } from "three";

export function seismic_update() {
    const locX = randRange(-30, 60);
    const locY = randRange(0, 25);
    const locZ = randRange(0, 50);

    return new Vector3(locX, locY, locZ);
}
