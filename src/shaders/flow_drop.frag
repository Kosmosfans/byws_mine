uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

#define PI 3.14159

void main() {
    vec2 uv = vec2(vUv.x * 8., -vUv.y);

    float dx = fract(uv.x);
    uv.x = floor(uv.x);
    float t =  uTime * (0.1 + vSpeed);
    uv.y *= 0.15;// stretch

    float o = sin(uv.x * 215.4);// offset
    float s = cos(uv.x * 33.1) *.3 + .7;// speed
    float trail = mix(95.0, 10.0, s);// trail length
    float yv = fract(uv.y + t * s    + o) * trail;
    yv = 1.0 / yv;
    yv = smoothstep(0.0, 1.0, yv * yv);
    yv = sin(yv * PI) * (s * 15.0);
    float d2 = sin(dx * PI);
    yv *= d2 * d2;

    gl_FragColor = vec4(vColor * yv, .7);
}