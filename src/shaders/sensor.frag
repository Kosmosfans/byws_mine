#include ./lib/noise.glsl;

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vColor;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec3 light = normalize(vec3(1., 0.2, 0.5));
    float diffuse = dot(vNormal, light) + 0.5;

    vec2 hash = vec2(vPosition.x / 35. + uTime * 3., vPosition.z / 35. - uTime * 2.2);
    float noise = fbm(hash) * 1.2;
    gl_FragColor = vec4(vColor * diffuse * noise, 1.);
}