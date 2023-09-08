varying vec2 vUv;

void main()
{
    float displacementStrength = 1. + uv.y;
    float newX = position.x * displacementStrength;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newX, position.y, position.z, 1.0);

    vUv = uv;
}