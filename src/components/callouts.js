import Callout from "../core/Callout.js";

export default function initCallout(world) {
    const callout = new Callout(world.camera);

    world.add(callout.mesh);
    world.registerUpdatable(callout);

    return callout;
}