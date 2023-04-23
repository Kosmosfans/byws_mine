import World from "./world/World.js";

(() => {
    const container = document.querySelector("#scene-container");
    new World(container).init().catch((e) => console.error(e));
}).call(this);
