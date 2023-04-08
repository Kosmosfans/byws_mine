import { Color, Scene, Fog } from 'three';

function createScene() {
    const scene = new Scene();

    const bgColor = '#555555';
    scene.background = new Color(bgColor);
    scene.fog = new Fog(bgColor, 5, 100);
    return scene;
}

export { createScene };