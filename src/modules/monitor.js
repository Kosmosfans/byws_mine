import Monitor from "../core/Monitor.js";
import { DATA } from "../data/DATA.js";

export default function initMonitor() {
    const data = DATA.monitor_init();
    return new Monitor(data);
}
