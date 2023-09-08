#include ./lib/perlin2d.glsl;

uniform float uTime;
varying vec2 vUv;

void main()
{
    vec2 uv = vec2(vUv.x * 2., vUv.y - uTime * 0.5);

    float borderAlpha = min(vUv.x * 4.0, (1.0 - vUv.x) * 4.0);
    borderAlpha = borderAlpha * (1.0 - vUv.y);

    float noise = perlin2d(uv);
    noise *= borderAlpha * 0.4;

    gl_FragColor = vec4(1., 1., 1., noise);
}