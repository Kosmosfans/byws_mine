#include ./lib/noise.glsl;

uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

void main() {
    float id = floor(vUv.y * 3.);
    vec2 uv = vec2(vUv.x, fract(vUv.y * 3.));

    // distort
    uv.y += abs(vUv.x - 0.5);
    float pattern = step(0.5, fract(uv.y));

    float alpha = clamp(sin(id / 2. - uTime * vSpeed * 10.), 0., 1.) * 0.5;
//    float alpha = fbm(vec2(id / 2.)- uTime * vSpeed) - 0.3;

    alpha = pow(alpha, 2.0) * 2. + 0.25;

    gl_FragColor = vec4(vColor * pattern * alpha, 1.);
}