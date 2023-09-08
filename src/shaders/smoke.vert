#include ./lib/perlin2d.glsl;

uniform float uTime;
varying vec2 vUv;

void main()
{
    float displacementStrength = pow(uv.y * 3.0, 2.0);
    float noise = perlin2d(vec2(uv.x, uv.y * 5. -uTime)) * displacementStrength;

    float newX = position.x * (1. + noise * 2.);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newX, position.y, position.z, 1.0);

    vUv = uv;
}