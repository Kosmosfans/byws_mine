import Personnel from "../core/Personnel.js";
import { data } from "../system/data.js";

export function initPersonnel(world) {
    const p = new Personnel(data.personnel_init());

    world.add(p.mesh);
    world.registerUpdatable(p);
}