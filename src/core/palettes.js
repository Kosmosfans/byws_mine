// idea: https://iquilezles.org/articles/palettes/
// editor: http://erkaman.github.io/glsl-cos-palette/

// [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.00, 0.33, 0.67]
// [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.00, 0.10, 0.20]
// [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.30, 0.20, 0.20]
// [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 0.5], [0.80, 0.90, 0.30]
// [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 0.7, 0.4], [0.00, 0.15, 0.20]
// [0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [2.0, 1.0, 0.0], [0.50, 0.20, 0.25]
// [0.8, 0.5, 0.4], [0.2, 0.4, 0.2], [2.0, 1.0, 1.0], [0.00, 0.25, 0.25]

function cosinePalette(a, b, c, d) {
    return t => [
        a[0] + b[0] * Math.cos(6.28318 * (t * c[0] + d[0])),
        a[1] + b[1] * Math.cos(6.28318 * (t * c[1] + d[1])),
        a[2] + b[2] * Math.cos(6.28318 * (t * c[2] + d[2]))
    ]
}

export const palette1 = {
    getColor: t => cosinePalette([0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 0.5], [0.8, 0.9, 0.3])(t)
}

export const palette2 = {
    getColor: t => cosinePalette([0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1.0, 1.0, 1.0], [0.00, 0.10, 0.20])(t)
}

export const palette3 = {
    getColor: (t, f1, f2) => {
        const palette = cosinePalette([0.09, 1.00, 0.37], [0.28, 0.50, 0.90], [0.08, 0.25, 0.48], [0.91, 0.16, 0.16]);
        return f1 ? [1, 0, 0] : (f2 ? [0, 0, 0] : palette(t));
    }
}

export const palette4 = {
    getColor: (t, f1, f2) => {
        const palette = cosinePalette([0.01, 0.11, 0.05], [0.93, 0.92, 0.45], [0.81, 0.77, 0.82], [0.85, 0.67, 0.62]);
        return f2 ? [0, 0, 0] : palette(t);
    }
}

export const palette5 = {
    getColor: (t, f1, f2) => {
        const palette = cosinePalette([0.43, 0.78, 0.02], [0.29, 0.11, 0.68], [0.94, 0.37, 0.92], [0.07, 0.36, 0.40]);
        return f2 ? [0, 0, 0] : palette(t);
    }
}

export const palette6 = {
    getColor: (t, f1, f2) => {
        const palette = cosinePalette([0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [1, 1, 1], [0.263, 0.416, 0.557]);
        return f2 ? [0, 0, 0] : palette(t);
    }
}

export const palette7 = {
    getColor: (t) => {
        const palette = cosinePalette([0.21,0.28,0.00], [0.60, 0.90, 0.20], [0.40, 0.13, 0.04], [0.58,0.40,0.60]);
        return palette(t);
    }
}