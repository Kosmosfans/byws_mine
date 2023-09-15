import Ct from "../core/Ct.js";

export default function initCt(world) {
    const list = [];
    list.push(world.scene.getObjectByName('layer01'));
    list.push(world.scene.getObjectByName('layer02'));
    list.push(world.scene.getObjectByName('layer03'));
    list.push(world.scene.getObjectByName('layer04'));

    return new Ct(list);
}