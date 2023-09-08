#include ./lib/noise.glsl;

uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 uv = vec2(vUv.x * 6., vUv.y * 3. - uTime * 17.);
    float val = fbm(vec2(uv.x, uv.y)) * 1.5;
    vec2 border = min(smoothstep(0., 0.4, vUv), smoothstep(1., 0.6, vUv));

    val *= border.x * border.y;
    val = pow(val, 2.0);
    val *= 0.1;

    gl_FragColor = vec4(1., 1., 1., val);
}