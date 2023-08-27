import Seismic from "../core/Seismic.js";

export default function initSeismic(world) {
    const seismic = new Seismic();

    world.add(seismic.mesh);
    world.registerUpdatable(seismic);

    return seismic;
}
