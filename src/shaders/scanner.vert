varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;

void main() {
    vec4 instancePos = instanceMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelMatrix * viewMatrix * instancePos;

    vUv = uv;
    vPosition = instancePos.xyz;
    vColor = instanceColor;
}
