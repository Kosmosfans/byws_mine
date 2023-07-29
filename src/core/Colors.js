import { Color } from "three";

const color = new Color();

function colorMap1(factor1, factor2, factor3) {
    const hue = 0.3 + factor1 * 0.25;
    color.setHSL(hue, 0.9, 0.4);

    if (factor2) color.setHSL(0, 0.8, 0.2);
    if (factor3) color.setHSL(0, 0, 0);

    return color;
}

export const Colors = {
    SCHEME1: { getColor: colorMap1 },
    SCHEME2: { getColor: colorMap1 }
};