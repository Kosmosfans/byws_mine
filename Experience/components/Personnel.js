export default class Personnel {
    constructor(gltf) {
        this.personnels = new Set();
        gltf.scene.traverse(n => n.name.startsWith("personnel") ? this.personnels.add(n) : {});
    }

    tick(delta) {
        this.personnels.forEach(n => n.rotation.y += delta * 5);
    }
}