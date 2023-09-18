#include ./lib/noise.glsl;

uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

void main() {
    float border = 1. - 2. * abs(vUv.x - 0.5);
    if (border < 0.3) discard;

    vec2 uv = vec2(vUv.x * 2., vUv.y * 1.2 - vSpeed * uTime * 4.);
    float noise = fbm(vec3(uv.x, uv.y, uTime * .5)) * 1.4;
    noise = pow(noise, 10.) * 2.;

    gl_FragColor = vec4(vColor, noise);
}