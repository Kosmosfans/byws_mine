// psrdnoise2.glsl, version 2021-12-02
// Copyright (c) 2021 Stefan Gustavson and Ian McEwan
// (stefan.gustavson@liu.se, ijm567@gmail.com)
//
// Available for download from Github:
// https://github.com/stegu/psrdnoise/
//
// Published under the MIT license, see:
// https://opensource.org/licenses/MIT
//
// tutorial:
// https://stegu.github.io/psrdnoise/2d-tutorial/2d-psrdnoise-tutorial-01.html

vec3 psrdnoise(vec2 x, vec2 period, float alpha)
{
    // 2) Transform input point to find simplex "base" i0
    vec2 uv = vec2(x.x + x.y * 0.5, x.y);
    vec2 i0 = floor(uv), f0 = fract(uv);

    // 3) Enumerate simplex corners and transform back
    float cmp = step(f0.y, f0.x);
    vec2 o1 = vec2(cmp, 1.0 - cmp);
    vec2 i1 = i0 + o1, i2 = i0 + 1.0;
    vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
    vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
    vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);

    // 4) Compute distances to corners before we wrap them
    vec2 x0 = x - v0, x1 = x - v1, x2 = x - v2;
    vec3 iu, iv, xw, yw;

    // 5),6) wrap to period and adjust i0, i1, i2 accordingly
    if (any(greaterThan(period, vec2(0.0)))) {
        xw = vec3(v0.x, v1.x, v2.x); yw = vec3(v0.y, v1.y, v2.y);
        if (period.x > 0.0)
        xw = mod(vec3(v0.x, v1.x, v2.x), period.x);
        if (period.y > 0.0)
        yw = mod(vec3(v0.y, v1.y, v2.y), period.y);
        iu = floor(xw + 0.5*yw + 0.5); iv = floor(yw + 0.5);
    } else {
        iu = vec3(i0.x, i1.x, i2.x); iv = vec3(i0.y, i1.y, i2.y);
    }

    // 7) Compute the hash for each of the simplex corners
    vec3 hash = mod(iu, 289.0);
    hash = mod((hash * 51.0 + 2.0) * hash + iv, 289.0);
    hash = mod((hash * 34.0 + 10.0) * hash, 289.0);

    // 8),9a) Generate the gradients with an optional rotation
    vec3 psi = hash * 0.07482 + alpha;
    vec3 gx = cos(psi); vec3 gy = sin(psi);
    vec2 g0 = vec2(gx.x, gy.x);
    vec2 g1 = vec2(gx.y, gy.y);
    vec2 g2 = vec2(gx.z, gy.z);

    // 10) Compute radial falloff
    vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
    w = max(w, 0.0); vec3 w2 = w * w; vec3 w4 = w2 * w2;

    // 11) Linear ramp along gradient (by a scalar product)
    vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));

    // 12),13) Multiply and sum up noise terms
    float n = dot(w4, gdotx);

    // 14) Compute first order partial derivatives
    vec3 w3 = w2 * w; vec3 dw = -8.0 * w3 * gdotx;
    vec2 dn0 = w4.x * g0 + dw.x * x0;
    vec2 dn1 = w4.y * g1 + dw.y * x1;
    vec2 dn2 = w4.z * g2 + dw.z * x2;
    vec2 gradient = (dn0 + dn1 + dn2);

    // Scale the noise value to [-1,1] (empirical factor)
    return 10.9 * vec3(n, gradient);
}
