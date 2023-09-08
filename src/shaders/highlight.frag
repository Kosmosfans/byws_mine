uniform float uTime;

void main() {
    float alpha = abs(sin(uTime * 2.5)) * 0.25;
    gl_FragColor = vec4(1., 1., 1., alpha);
}