import Surveillance from "../core/Surveillance.js";
import { DATA } from "../data/DATA.js";

export default function initSurveillance() {
    const data = DATA.surveillance_init();
    return new Surveillance(data);
}