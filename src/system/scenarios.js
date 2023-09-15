const scenarios = {
    'tunnel': { meshes: [] },
    'stratum': { meshes: [] },
};

let active;

export default {
    addMesh,
    setScenario,
}

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