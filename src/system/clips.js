import { AnimationMixer } from "three";

class Clips {
    constructor(gltf) {
        this.mixer = new AnimationMixer(gltf.scene);
        this.animations = gltf.animations.filter(n => n.name.endsWith('Action'));
    }

    playAll = () => this.animations.forEach(clip => this.mixer.clipAction(clip).play());

    tick = (delta) => this.mixer.update(delta);
}

export default function initGltfClips(world) {
    const clips = new Clips(world.gltf);
    clips.playAll();

    world.registerUpdatable(clips);
    return clips;
}