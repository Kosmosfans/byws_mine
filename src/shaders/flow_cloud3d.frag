uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vSpeed;

#define SAMPLE_CNT 80.
#define CAMERA vec3(20., 20., 20.)
#define LOOKAT vec3(0., -100., 0.)
#define STEP 1.

//
// rotation when doing fbm
//
mat3 rot = mat3( 0.00,  0.80,  0.60,
                -0.80,  0.36, -0.48,
                -0.60, -0.48,  0.64 );

float hash(float n)
{
    return fract(sin(n) * 43758.5453);
}

//
// tri-linear interpolation value noise
//
float noise(in vec3 x)
{
    vec3 p = floor(x);
    vec3 f = fract(x);

    f = f * f * (3.0 - 2.0 * f);

    float n = p.x + p.y * 57.0 + 113.0 * p.z;

    float res = mix(mix(mix(hash(n +   0.0), hash(n +   1.0), f.x),
                        mix(hash(n +  57.0), hash(n +  58.0), f.x), f.y),
                    mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                        mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
    return res;
}


float fbm(vec3 p)
{
    float f;
    f  = 0.5000 * noise(p); p = rot * p * 2.02;
    f += 0.2500 * noise(p); p = rot * p * 2.03;
    f += 0.1250 * noise(p);
    return f;
}

///
/// cloud as a plane
///
/// But this function return inverse value.
/// Because this function is used for density.
///
float scene(in vec3 pos)
{
    vec4 param = vec4(0., 1., 0., 0.);
    float sdPlane = dot(pos, param.xyz) + param.w;

    return  -sdPlane * .2 + fbm(pos + vec3(uTime * .5, 0., 0.));
}

///
/// Main function.
///
void main()
{
    vec2 uv = vUv;

    // ray origin (camera position)
    vec3 ro = CAMERA;

    // camera lookat
    vec3 ta = LOOKAT;

    // distance from camera to projection screen (zoom)
    float zoom = 1.5;

    vec3 F = normalize(ta - ro);
    vec3 R = cross(F, vec3(0., 1., 0.));
    vec3 U = cross(R, F);

    // ray direction
    vec3 rd = normalize(R * uv.x + U * uv.y + F * zoom);

    // ray marching distance
    float dist = 0.;


    float transmittance = 1.0;
    vec4 color = vec4(0.0);

    for (float i = 0.; i < SAMPLE_CNT; i += 1.)
    {
        vec3 p = ro + rd * dist;

        // step gets larger while ray travels further
        dist += max(STEP, dist * 0.02);

        float density = scene(p);
        if (density < 0.03) continue;

        transmittance *= 1.0 - density;

        if (transmittance <= 0.01) break;

        vec4 cloudColor = vec4(1.);
        color += cloudColor * density * transmittance * 0.9;

    }

    // add background coloe
    //    vec3 bg = mix(vec3(0.3, 0.1, 0.8), vec3(0.7, 0.7, 1.0), 1.0 - (uv.y + 1.0) * 0.5);
    vec3 bg = vec3(0.15);
    color.rgb += bg;

    gl_FragColor = color;
}