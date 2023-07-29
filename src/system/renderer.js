import { WebGLRenderer, BasicShadowMap } from 'three';

export default function createRenderer(world) {
    const renderer = new WebGLRenderer({ antialias: true });
    world.container.append(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = BasicShadowMap;
    renderer.shadowMap.needsUpdate = true;

    return renderer;
}