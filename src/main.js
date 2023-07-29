import World from "./system/World.js";

const world = new World();
world.init().then(() => world.start());
