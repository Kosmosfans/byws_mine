const tunnelGraphData = {
    vertexData: [
        { x: 15.9, y: -0.70 + 40, z: -6.759 },
        { x: 64.498, y: -26.01 + 40, z: -6.6 },
        { x: 89.274, y: -31.15 + 40, z: -6.541 },
        { x: 111.36, y: -31.15 + 40, z: -6.40 },
        { x: 111.57, y: -31.59 + 40, z: 21.95 },
        { x: 111.5, y: -32.893 + 40, z: 44.13 },
        { x: 107.08, y: -32.721 + 40, z: 43.989 },
        { x: 99.917, y: -32.991 + 40, z: 43.989 },
        { x: 99.822, y: -32.991 + 40, z: 36.978 },
        { x: 72.794, y: -32.82 + 40, z: 36.923 },
    ],
    edgeData: [
        { source: 1, target: 0, speed: 0.002 },
        { source: 2, target: 1, speed: 0.0025 },
        { source: 3, target: 2, speed: 0.004 },
        { source: 4, target: 3, speed: 0.004 },
        { source: 5, target: 4, speed: 0.004 },
        { source: 6, target: 5, speed: 0.004 },
        { source: 7, target: 6, speed: 0.004 },
        { source: 8, target: 7, speed: 0.004 },
        { source: 9, target: 8, speed: 0.004 },
    ]
};

const coalGraphData = {
    vertexData: [
        { x: 65.926, y: -22.079 + 40, z: 57.851},
        { x: 104.88, y: -18.151 + 40, z: 35.633 },
        { x: 104.88, y: -18.208 + 40, z: -1.507 },
        { x: 53.23, y: -18.33 + 40, z: -1.88 },
        { x: 9.409, y: -1.67 + 40, z: -1.8 },

    ],
    edgeData: [
        { source: 0, target: 1, speed: 0.002 },
        { source: 1, target: 2, speed: 0.0025 },
        { source: 2, target: 3, speed: 0.004 },
        { source: 3, target: 4, speed: 0.004 },
    ]
};



export { tunnelGraphData, coalGraphData };