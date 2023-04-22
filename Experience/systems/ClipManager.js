import { AnimationMixer } from "three";

export default class ClipManager {

    constructor(gltf) {
        this.mixer = new AnimationMixer(gltf.scene);
        this.animations = gltf.animations.filter(n => n.name.endsWith('Action'));
    }

    playAllAnimations() {
        this.animations.forEach(clip => this.mixer.clipAction(clip).play());
    }

    tick(delta) {
        this.mixer.update(delta);
    }
}