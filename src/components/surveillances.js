import Surveillance from "../core/Surveillance.js";
import { DATA } from "../data/DATA.js";

export default function initSurveillance(world) {
    const s = new Surveillance(DATA.surveillance_init());
    world.add(s.mesh);
    world.registerUpdatable(s);

    return s;
}