import Seismic from "../core/Seismic.js";
import scenarios from "../system/scenarios.js";

export default function initSeismic() {
    const stratum = scenarios.getMeshes('stratum')[0].children[0];
    return new Seismic(stratum);
}
