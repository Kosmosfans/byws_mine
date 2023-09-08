import { Clock } from "three";

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = new Set();
    }

    start() {
        this.renderer.setAnimationLoop(() => this.#tick());
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    registerUpdatable(obj) {
        this.updatables.add(obj);
    }

    removeUpdatable(obj) {
        this.updatables.delete(obj);
    }

    #tick() {
        const delta = clock.getDelta();
        this.updatables.forEach(i => i.tick(delta));

        this.renderer.render(this.scene, this.camera);
    }
}

export default function initLoop(world) {
    return new Loop(world.camera, world.scene, world.renderer);
}