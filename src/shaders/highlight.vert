uniform float uNormalOff;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vec4 displacement = vec4(normalize(normalMatrix * normal) * uNormalOff, 0.0);
    gl_Position = projectionMatrix * (displacement + mvPosition);
}