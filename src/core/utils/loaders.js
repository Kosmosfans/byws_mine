import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let _loader;

const gltfLoader = {
    load: async (url) => {
        if (!_loader) _loader = setupLoader();
        return _loader.loadAsync(url);
    }
}

function setupLoader() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    return gltfLoader;
}

export default gltfLoader;