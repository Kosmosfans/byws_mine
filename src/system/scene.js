import { Color, Scene } from 'three';

export default function createScene() {
    const scene = new Scene();
    scene.background = new Color('#161616');
    return scene;
}
