import initCallout from "./callouts.js";
import Interaction from "../core/Interaction.js";

export default function initInteraction(world) {
    const callout = initCallout(world);
    const interaction = new Interaction(world.camera, world.scene, callout);

    world.registerUpdatable(interaction);

    return interaction;
}