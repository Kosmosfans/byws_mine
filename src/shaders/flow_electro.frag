#include ./lib/hashnoise.glsl;

uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

void main()
{
    vec2 uv = 1.- vUv.yx;

    uv.y -= 0.5;
    uv.y += 0.4 * (2.0 * fbm(uv + uTime * 6.0, 10) - 1.0);

    float dist = abs(uv.y);
    float flash = mix(0.0, 0.2, hash11(uTime)) / dist;
    vec3 col = vColor * flash * flash;

    gl_FragColor = vec4(col, 0.55);
}