import { WebGLRenderer, BasicShadowMap, PCFSoftShadowMap, VSMShadowMap, PCFShadowMap } from 'three';

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    // renderer.shadowMap.needsUpdate = true;
    return renderer;
}

export { createRenderer };