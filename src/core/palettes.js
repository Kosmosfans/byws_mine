// idea: https://iquilezles.org/articles/palettes/
// editor: http://erkaman.github.io/glsl-cos-palette/
function cosinePalette(a, b, c, d) {
    return t => [
        a[0] + b[0] * Math.cos(6.28318 * (t * c[0] + d[0])),
        a[1] + b[1] * Math.cos(6.28318 * (t * c[1] + d[1])),
        a[2] + b[2] * Math.cos(6.28318 * (t * c[2] + d[2]))
    ]
}

// https://observablehq.com/@mbostock/turbo
function interpolateTurbo(x) {
    x = Math.max(0, Math.min(1, x));
    return [
        34.61 + x * (1172.33 - x * (10793.56 - x * (33300.12 - x * (38394.49 - x * 14825.05)))),
        23.31 + x * (557.33 + x * (1225.33 - x * (3574.96 - x * (1073.77 + x * 707.56)))),
        27.2 + x * (3211.1 - x * (15327.97 - x * (27814 - x * (22569.18 - x * 6838.66))))
    ].map(a => a / 256);
}

export const palette0 = {
    getColor: interpolateTurbo
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
        const palette = cosinePalette([0.21, 0.28, 0.00], [0.60, 0.90, 0.20], [0.40, 0.13, 0.04], [0.58, 0.40, 0.60]);
        return palette(t);
    }
}