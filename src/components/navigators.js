import Navigator from "../core/Navigator.js";

export default function initNavigator(world) {
    const navi = new Navigator({ width: 0.18 });

    world.add(navi.mesh);
    world.registerUpdatable(navi);

    return navi;
}
