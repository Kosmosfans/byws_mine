import { setCamera } from "./controls2.js";

const UI = {
    moduleButtons: Array.from(document.getElementsByClassName('module')),
    cameraButtons: Array.from(document.getElementsByClassName('camera')),

    moduleBind: {
        module_button_1: 'flow',
        module_button_2: 'personnel',
        module_button_3: 'coal',
        module_button_4: 'tram',
        module_button_5: 'electro',
        module_button_6: 'seismic',
        module_button_7: 'surveillance',
        module_button_8: 'patrol',
        module_button_9: 'monitor',
        module_button_A: 'navigator',

        module_button_B: 'tunnel',
    },

    cameraBind: {
        camera_button_1: 'default',
        camera_button_2: 'surface',
        camera_button_3: 'layer-1',
        camera_button_4: 'layer-2',
        camera_button_5: 'top-view',
        camera_button_6: 'default',
    }
}

let world;

export default function initApi(_world) {
    world = _world;

    UI.moduleButtons.forEach(b => b.addEventListener('click', (e) => moduleButtonClicked(e.target)));
    UI.moduleButtons[0].dispatchEvent(new Event('click')); // default module

    UI.cameraButtons.forEach(b => b.addEventListener('click', (e) => cameraButtonClicked(e.target)));
    UI.cameraButtons[0].dispatchEvent(new Event('click')); // default camera
}

function moduleButtonClicked(btn) {
    UI.moduleButtons.forEach(b => b === btn ? b.classList.add("selected") : b.classList.remove("selected"));
    world.setModule(UI.moduleBind[btn.id]);
}

function cameraButtonClicked(btn) {
    const type = UI.cameraBind[btn.id];
    setCamera(type);
}