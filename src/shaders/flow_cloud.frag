uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

#include ./lib/noise.glsl;

void main() {
    vec2 uv = vec2(vUv.x * 2., vUv.y * 2. - vSpeed * uTime * 5.);
//    float b = 1. - 2. * abs(vUv.x - 0.5);
//    float borderAlpha = (3.0 * b * b - 2.0 * b * b * b) * 1.6;
    float val = fbm(vec3(uv.x, uv.y, uTime * 1.)) * 1.5;
//    float val = fbm(uv);
//    float val = noise(uv);
    val *= val * 1.6;
//    val *= borderAlpha;
    gl_FragColor = vec4(vColor, val);
}