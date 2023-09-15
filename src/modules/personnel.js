import Personnel from "../core/Personnel.js";
import { DATA } from "../data/DATA.js";

export default function initPersonnel() {
    const data = DATA.personnel_init();
    return new Personnel(data);
}