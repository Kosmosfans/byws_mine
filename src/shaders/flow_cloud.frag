#include ./lib/noise.glsl;

uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

void main() {
    vec2 uv = vec2(vUv.x * 2., vUv.y * 3. - vSpeed * uTime * 14.);
    float val = fbm(vec3(uv.x, uv.y, uTime * .5)) * 1.5;
    float alpha = pow(val, 10.0) * .85;
    gl_FragColor = vec4(vColor, alpha);
}