uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

#include ./lib/noise.glsl;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
//    vec2 uv = vec2(vUv.x * 3. + vPosition.x, vUv.y * 3. + vPosition.z);
//    float f1 = hash(vPosition.xy * 0.02);
//    float val = fbm(vec2(f1, uTime * 2.));
//    val *= val;
//    val = clamp(val, 0. ,0.2);

    vec3 light = normalize(vec3(1., 0.2, 0.5));
    float diffuse = dot(vNormal, light) + 0.4;

    float val = 0.;
    vec3 color = hsv2rgb(vec3(0.35, 0.9, 1. - val));
//    vec3 color = hsv2rgb(vec3(0.079, 0.995, 0.99 - val));
    gl_FragColor = vec4(color * diffuse, 1.);
}