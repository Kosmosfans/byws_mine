import { rand } from "../core/utils/utils.js";
import coalPaths from "./conveyor_paths.json" assert { type: 'JSON' };

export function conveyorUpdate() {
    return coalPaths.map(() => 1 + rand() * 4);
}