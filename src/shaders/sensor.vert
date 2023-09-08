// for instanced mesh
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vColor;

void main() {
    vec4 instancePosition = instanceMatrix * vec4(position, 1.0);

    vPosition = instancePosition.xyz;
    vNormal = normal;
    vColor = instanceColor;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * instancePosition;
}