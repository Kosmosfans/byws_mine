import initCallout from "./callouts";
import TunnelDetail from "../core/TunnelDetail.js";

export default function initTunnelDetail(world) {
    const callout = initCallout(world);
    return new TunnelDetail(0.16, callout, world.camera);
}