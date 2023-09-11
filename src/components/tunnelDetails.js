import initCallout from "./callouts";
import TunnelDetail from "../core/TunnelDetail.js";

export default function initTunnelDetail(world) {
    const callout = initCallout(world);
    const d = new TunnelDetail(0.17, callout, world.camera);

    world.add(d.mesh);
    world.registerUpdatable(d);

    return d;
}