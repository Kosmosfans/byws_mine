const scenarios = {
    'tunnel': { meshes: [] },
    'stratum': { meshes: [] },
};

let active;

function addMesh(id, mesh) {
    if (!scenarios[id]) return;
    scenarios[id].meshes.push(mesh);
}

function setScenario(id, world) {
    if (!scenarios[id] || active === id) return;

    close(active, world);

    scenarios[id].meshes.forEach(m => world.add(m));
    active = id;
}

function close(id, world) {
    if (!scenarios[id]) return;

    scenarios[id].meshes.forEach(m => world.remove(m));
    active = null;
}

function getMeshes(id) {
    return scenarios[id].meshes;
}

export default {
    addMesh,
    setScenario,
    getMeshes,
}