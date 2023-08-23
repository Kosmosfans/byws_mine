import Personnel from "../core/Personnel.js";
import { data } from "../system/data.js";

export default function initPersonnel(world) {
    const p = new Personnel(data.personnel_init());

    world.add(p.mesh);
    world.registerUpdatable(p);

    return p;
}