import Monitor from "../core/Monitor.js";
import { DATA } from "../data/DATA.js";

export default function initMonitor(world) {
    const monitor = new Monitor(DATA.monitor_init());

    world.add(monitor.mesh);
    world.registerUpdatable(monitor);

    return monitor;
}
