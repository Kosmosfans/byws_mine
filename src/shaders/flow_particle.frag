uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

const float cols = 3.;
const float rows = 4.;
const float percentage = 0.08;
const float alpha = 0.7;

float hash(float x) {
    return fract(sin(x) * 1e4);
}

void main() {
    float tileX = floor(vUv.x * cols);
    float speedY = vSpeed * 4. * (1. + hash(3. + tileX) * 6.);
    float tileY = floor(vUv.y * rows - uTime * speedY);

    float id = hash(tileX) + hash(tileY);
    float visable = step(1. - percentage, hash(id));

    gl_FragColor = vec4(vColor, visable * alpha);
}