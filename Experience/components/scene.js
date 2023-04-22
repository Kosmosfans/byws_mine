import { Color, Scene, Fog } from 'three';

function createScene() {
    const scene = new Scene();

    const bgColor = '#303030';
    scene.background = new Color(bgColor);
    // scene.fog = new Fog(bgColor, 5, 1000);
    return scene;
}

export { createScene };