import Ct from "../core/Ct.js";
import scenarios from "../system/scenarios.js";

export default function initCt() {
    const stratum = scenarios.getMeshes('stratum')[0];
    return new Ct(stratum);
}