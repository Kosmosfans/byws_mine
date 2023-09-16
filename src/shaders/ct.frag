#include ./lib/psrdnoise.glsl;

uniform float uTime;
uniform vec2 uSize;
uniform vec3 uColor;

varying vec2 vUv;

#define EDGE 0.015

float psrd_fbm(vec2 uv, float rot) {
    const vec2 period = vec2(0., 0.);
    vec2 gredientSum = vec2(0.);
    float warp = 0.13;

    float noise = 0.0;
    float weight = 1.0;
    float scale = 1.0;
    for (float i = 0.0; i < 5.0; i++) {
        vec3 psrd = psrdnoise(scale * uv + warp * gredientSum, scale * period, scale * rot);
        noise += psrd.x;
        gredientSum += weight * psrd.yz;

        weight *= 0.5;
        scale *= 2.0;
    }
    return noise;
}

void main() {
    vec2 uv = vec2(vUv.x * uSize.x, vUv.y * uSize.y) * 0.5;

    // border alpha
    float borderX = abs(vUv.x - 0.5) * 2.;
    float borderY = abs(vUv.y - 0.5) * 2.;
    borderX = smoothstep(1. - EDGE * (uSize.y / uSize.x), 1., borderX);
    borderY = smoothstep(1. - EDGE, 1., borderY);
    float border = max(borderX, borderY) * .5;

    // noise from -1 to 1
    float noise = border > 0.01 ? psrd_fbm(uv, uTime * 0.5) : 0.;
    float bg = 0.5 + 0.4 * noise;

    // scan effect
    float s = (fract(-vUv.y * 0.5 - uTime * 0.25) - 0.5) * 2.;
    s = clamp(s - 0.5, 0., 1.) * 0.1;

    gl_FragColor = vec4(uColor * (bg * border + s), 1.);
}