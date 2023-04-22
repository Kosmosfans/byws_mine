import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from "three";

export default class GraphParticleSystem {
    constructor(graph, maxParticleCnt = 7000, speed = 0.0008, color = 0xbdff00) {
        this.graph = graph;

        this.edgeInfo = calcBasicInfo(this.graph);
        calcStepInfo(this.edgeInfo, speed);
        calcParticleCntOfEachEdge(this.edgeInfo, maxParticleCnt);

        const { particlePositions, particleProgress } = initParticles(this.edgeInfo);
        this.particlePositions = particlePositions;
        this.particleProgress = particleProgress;

        this.particleMesh = createParticleMesh(this.particlePositions, color);
    }

    getMesh() {
        return this.particleMesh;
    }

    tick(delta) {
        this.edgeInfo.forEach(edge => {
            for (let i = edge.startParticleNo; i < edge.startParticleNo + edge.particleCnt; i++) {
                this.particleProgress[i] += edge.speed;
                this.particlePositions[i * 3] += edge.stepX;
                this.particlePositions[i * 3 + 1] += edge.stepY;
                this.particlePositions[i * 3 + 2] += edge.stepZ;

                if (this.particleProgress[i] >= 1) {
                    this.particleProgress[i] -= 1;
                    this.particlePositions[i * 3] -= edge.dx;
                    this.particlePositions[i * 3 + 1] -= edge.dy;
                    this.particlePositions[i * 3 + 2] -= edge.dz;
                }
            }
        });
        this.particleMesh.geometry.attributes.position.needsUpdate = true;

    }
}

function calcBasicInfo(graph) {
    const result = [];
    graph.getEdges().forEach((edge, i) => {
        const source = edge.source;
        const target = edge.target;
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dz = target.z - source.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        result.push({
            'source': source,
            'target': target,
            'dx': dx,
            'dy': dy,
            'dz': dz,
            'distance': distance,
        });
    });

    return result;
}

function calcStepInfo(edgeInfo, speed) {
    edgeInfo.forEach(edge => {
        Object.assign(edge, { 'speed': speed });
        Object.assign(edge, { 'stepX': edge.dx * speed });
        Object.assign(edge, { 'stepY': edge.dy * speed });
        Object.assign(edge, { 'stepZ': edge.dz * speed });
    })
}

function calcParticleCntOfEachEdge(edgeInfo, maxParticleCnt) {
    const totalDistance = edgeInfo.map(info => info.distance).reduce((a, b) => a + b);

    let runningTotal = 0;
    edgeInfo.forEach(edge => {
        const cnt = Math.ceil(edge.distance / totalDistance * maxParticleCnt);
        Object.assign(edge, { 'particleCnt': cnt });
        Object.assign(edge, { 'startParticleNo': runningTotal });
        runningTotal += cnt;
    });
}

function initParticles(edgeInfo) {
    const totalParticles = edgeInfo.map(info => info.particleCnt).reduce((a, b) => a + b);
    const particlePositions = new Float32Array(totalParticles * 3);
    const particleProgress = new Float32Array(totalParticles);

    edgeInfo.forEach(edge => {
        const from = edge.startParticleNo;
        const to = from + edge.particleCnt;
        for (let i = from; i < to; i++) {
            particleProgress[i] = Math.random();
            particlePositions[i * 3] = edge.source.x + edge.dx * particleProgress[i] + Math.random() * 0.3 - 0.15;
            particlePositions[i * 3 + 1] = edge.source.y + edge.dy * particleProgress[i] + Math.random() * 0.3 - 0.15;
            particlePositions[i * 3 + 2] = edge.source.z + edge.dz * particleProgress[i] + Math.random() * 0.3 - 0.15;
        }
    });

    return { particlePositions, particleProgress };
}

function createParticleMesh(positions, color) {

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));

    const material = new PointsMaterial({
        size: 0.1,
        color: color,
    });

    return new Points(geometry, material);
}