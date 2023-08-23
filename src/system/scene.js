import { Color, Scene } from 'three';

export default function createScene() {
    const scene = new Scene();
    scene.background = new Color('#181818');
    return scene;
}
