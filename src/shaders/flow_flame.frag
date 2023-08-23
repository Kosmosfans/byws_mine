#include ./lib/noise.glsl;

uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

//float rand(vec2 n) {
//    return fract(sin(dot(n, vec2(12.9898, 12.1414))) * 83758.5453);
//}
//
//float noise(vec2 n) {
//    const vec2 d = vec2(0.0, 1.0);
//    vec2 b = floor(n);
//    vec2 f = mix(vec2(0.0), vec2(1.0), fract(n));
//    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
//}
//
//float fbm(vec2 n) {
//    return noise(n) + noise(n * 2.1) * .6 + noise(n * 5.4) * .42;
//}

void main() {
    vec2 uv = vUv.yx;

    uv.x += uv.y < .5 ? 2.0 + uTime * (vSpeed + .1) * 2. : -1.0 + uTime * (vSpeed + .1) * 2.;
    uv.y = abs(uv.y - .5);
    uv *= 5.;

    vec2 r = vec2(fbm(uv + uTime * 1.), fbm(uv - uTime * 1.));
    float grad = pow((r.y + r.y) * max(.0, uv.y) + .1, 4.0);

    vec3 color = vColor / (0.4 + grad);
//    color /= 1.50;
    gl_FragColor = vec4(color, 0.55);
}