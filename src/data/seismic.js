import { rand } from "../core/utils/utils.js";
import { Vector3 } from "three";

export function seismic_update() {
    const locX = rand(-30, 60);
    const locY = rand(-15, 5);
    const locZ = rand(0, 50);

    return new Vector3(locX, locY, locZ);
}
