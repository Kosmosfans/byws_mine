varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec4 viewPosition = viewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelMatrix * viewPosition;

    vPosition = position.xyz;
    vNormal = normal;
}