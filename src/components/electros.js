import Electro from "../core/Electro.js";

export default function initElectro(world) {
    const electro = new Electro({ width: 0.6 });

    world.add(electro.mesh);
    world.registerUpdatable(electro);

    return electro;
}
