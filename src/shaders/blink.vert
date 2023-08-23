// for instanced mesh
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vNormal;

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);

    vUv = uv;
    vPosition = gl_Position.xyz;
    vNormal = normal;
}