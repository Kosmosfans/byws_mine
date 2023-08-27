#include ./lib/noise.glsl;

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

vec3 palette(float t) {
    vec3 a = vec3(0.43, 0.78, 0.02);
    vec3 b = vec3(0.29, 0.11, 0.68);
    vec3 c = vec3(0.94, 0.37, 0.92);
    vec3 d = vec3(0.07, 0.36, 0.40);

    return a + b * cos(6.28318 * (c * t + d ));
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec3 light = normalize(vec3(1., 0.2, 0.5));
    float diffuse = dot(vNormal, light) + 0.4;

    float id = hash(vPosition.xz / 50.0);
    vec3 col = palette(id);
    gl_FragColor = vec4(col * diffuse, 1.);
}