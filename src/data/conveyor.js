import { rand } from "../core/utils/utils.js";
import coalPaths from "../cfg/conveyor_paths.json" assert { type: 'JSON' };

export function conveyor_update() {
    return coalPaths.map(() => rand(1, 5));
}