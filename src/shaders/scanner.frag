#include ./lib/noise.glsl;

uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;

#define W 0.01

float scanLine(vec2 uv, float pct) {
    return smoothstep(pct - W, pct, uv.y) - smoothstep(pct, pct + W, uv.y);
}

void main() {
    if (abs(vUv.y - 0.5) > vUv.x * 0.5) discard;

    vec2 uv = vec2(vUv.x * 80., vUv.y * 80.);
    float gradient = pow(1. - vUv.x, 2.0);

    // bg
    float bg = fbm(vec3(uv.x, uv.y + uTime * 5.0, uTime * 2.0)) * 1.3;
    bg *= bg * bg;

    // scanlines
    float y1 = 0.5 * sin(uTime * 0.4) + 0.5;
    float y2 = 0.5 + sin(uTime * 1.9) + 0.5;
    float l1 = scanLine(vUv, (y1 - 0.5) * vUv.x + 0.5);
    float l2 = scanLine(vUv, (y2 - 0.5) * vUv.x + 0.5);

    gl_FragColor = vec4((bg + l1 + l2) * vColor * gradient, 0.95);
}