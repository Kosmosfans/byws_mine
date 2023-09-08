#include ./lib/psrdnoise.glsl;

uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

void main() {
    float border = 1. - 2. * abs(vUv.x - 0.5);
    if (border < 0.5) discard;

    const float nscale = 0.5;
    vec2 uv = nscale * (vUv - 0.5);
    uv.y += vSpeed * uTime * 2.0;
    const vec2 period = vec2(0., 0.);
    float alpha = uTime;

    vec2 gredient, gredientSum;
    float warp = 0.13;

    float noise = 0.0;
    float weight = 1.0;
    float scale = 1.0;
    gredientSum = vec2(0.0);

    for (float i = 0.0; i < 5.0; i++) {
        vec3 psrd = psrdnoise(scale * uv + warp * gredientSum, scale * period, scale * alpha);
        noise += psrd.x;
        gredientSum += weight * psrd.yz;

        weight *= 0.5;
        scale *= 2.0;
    }

    noise = 0.5 - 0.4 * noise;
    gl_FragColor = vec4(vColor, noise);
}