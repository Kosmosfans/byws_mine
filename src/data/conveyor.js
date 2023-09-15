import { rand } from "../core/utils/utils.js";
import coalPaths from "../config/conveyor_paths.json" assert { type: 'JSON' };

export function conveyor_update() {
    return coalPaths.map(() => rand(1, 5));
}