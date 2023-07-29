attribute float speed;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vUv = uv;
    vColor = color;
    vSpeed = speed;
}