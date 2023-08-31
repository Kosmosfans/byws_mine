import Personnel from "../core/Personnel.js";
import { DATA } from "../data/DATA.js";

export default function initPersonnel(world) {
    const p = new Personnel(DATA.personnel_init());

    world.add(p.mesh);
    world.registerUpdatable(p);

    return p;
}