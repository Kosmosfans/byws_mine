import { WebGLRenderer } from 'three';

export default function createRenderer(world) {
    const renderer = new WebGLRenderer({ antialias: true });
    world.container.append(renderer.domElement);

    return renderer;
}