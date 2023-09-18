uniform vec3 uWavePos[5];
uniform float uElapsed[5];

varying vec3 vPosition;
varying vec3 vNormal;

const float SOUND_SPEED = 16.;
const vec3 COL = vec3(0.3, 0.7, 0.99);

void main() {

    float alpha = 0.;

    for (int i = 0; i < 5; i++) {
        if (uWavePos[i] == vec3(0.)) continue;
        float d = distance(vPosition, uWavePos[i]) - uElapsed[i] * SOUND_SPEED;
        if (d > 0.) continue;

        d *= d;
        float wave = .1 / d;
        wave *= wave;
        wave = clamp(wave, 0., 1.) * 3./ pow(uElapsed[i], 2.);

        alpha += wave;
    }

    gl_FragColor = vec4(COL, alpha);
}