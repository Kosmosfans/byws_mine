import { BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from "three";

let DEFAULT_PARTICLE_CNT = 5000;
let DEFAULT_SPEED = 1; // meters per second
let DEFAULT_COLOR = 0xCCFF00;
let DEFAULT_FLOW_WIDTH = 0.3;
let DEFAULT_PARTICLE_SIZE = 0.1;

export default class ParticleFlow {

    #settings;
    #paths = [];
    #particleCnt;
    #particleJitters;
    #particlePositions;
    #particleProgress;
    #particleColors;
    #mesh;

    constructor(graph, settings = {}) {
        this.#settings = settings;
        this.#calcPathInfo(graph);
        this.#calcPathCapacity();
        this.#initParticles();
        this.#createMesh();
    }

    get mesh() {
        return this.#mesh;
    }

    tick(delta) {
        this.#paths.forEach(p => this.#updateParticlesOfPath(p, delta));
        this.#mesh.geometry.attributes.position.needsUpdate = true;
    }

    #calcPathInfo(graph) {
        const colors = this.#settings['colorTable'] || [DEFAULT_COLOR];

        graph.edges.forEach((e, i) => {
            const source = graph.vertices[e.source];
            const target = graph.vertices[e.target];
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const dz = target.z - source.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const speed = e.speed || DEFAULT_SPEED;
            const color = colors[i % colors.length];

            const dummy = {};
            Object.assign(dummy, { 'source': source });
            Object.assign(dummy, { 'target': target });
            Object.assign(dummy, { 'dx': dx });
            Object.assign(dummy, { 'dy': dy });
            Object.assign(dummy, { 'dz': dz });
            Object.assign(dummy, { 'distance': distance });
            Object.assign(dummy, { 'speed': speed });
            Object.assign(dummy, { 'color': color });

            this.#paths.push(dummy);
        });
    }

    #calcPathCapacity() {
        const maxParticleCnt = this.#settings['particleCnt'] || DEFAULT_PARTICLE_CNT;
        const totalDistance = this.#paths.map(p => p.distance).reduce((a, b) => a + b, 0);

        let runningTotal = 0;
        this.#paths.forEach(p => {
            const cnt = Math.ceil(p.distance / totalDistance * maxParticleCnt);
            Object.assign(p, { 'particleCnt': cnt });
            Object.assign(p, { 'startPosition': runningTotal });
            runningTotal += cnt;
        });
        this.#particleCnt = runningTotal;
    }

    #initParticles() {
        this.#particleProgress = new Float32Array(this.#particleCnt);
        this.#particlePositions = new Float32Array(this.#particleCnt * 3);
        this.#particleColors = new Float32Array(this.#particleCnt * 3);

        this.#initJitterTable();
        this.#paths.forEach(p => this.#initParticlesOfPath(p));
    }

    #initJitterTable() {
        this.#particleJitters = new Float32Array(100 * 3);
        const radius = this.#settings['flowWidth'] || DEFAULT_FLOW_WIDTH;
        for (let i = 0; i < this.#particleJitters.length; i++)
            this.#particleJitters[i] = (Math.random() - 0.5) * radius;
    }

    #initParticlesOfPath(path) {
        for (let i = path.startPosition; i < path.startPosition + path.particleCnt; i++) {
            const progress = Math.random();
            const color = new Color(path.color);
            const offset = i % 100;

            this.#particleProgress[i] = progress;

            this.#particlePositions[i * 3] = path.source.x + path.dx * progress + this.#particleJitters[offset * 3];
            this.#particlePositions[i * 3 + 1] = path.source.y + path.dy * progress + this.#particleJitters[offset * 3 + 1];
            this.#particlePositions[i * 3 + 2] = path.source.z + path.dz * progress + this.#particleJitters[offset * 3 + 2];

            this.#particleColors[i * 3] = color.r;
            this.#particleColors[i * 3 + 1] = color.g;
            this.#particleColors[i * 3 + 2] = color.b;
        }
    }

    #createMesh() {
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new BufferAttribute(this.#particlePositions, 3));
        geometry.setAttribute('color', new BufferAttribute(this.#particleColors, 3));

        const material = new PointsMaterial({
            vertexColors: true,
            size: this.#settings['particleSize'] || DEFAULT_PARTICLE_SIZE
        });

        this.#mesh = new Points(geometry, material);
    }

    #updateParticlesOfPath(path, delta) {
        const deltaProgress = Math.min(0.01, path.speed * delta / path.distance);
        const deltaX = path.dx * deltaProgress;
        const deltaY = path.dy * deltaProgress;
        const deltaZ = path.dz * deltaProgress;

        for (let i = path.startPosition; i < path.startPosition + path.particleCnt; i++) {
            this.#particleProgress[i] += deltaProgress;

            this.#particlePositions[i * 3] += deltaX;
            this.#particlePositions[i * 3 + 1] += deltaY;
            this.#particlePositions[i * 3 + 2] += deltaZ;

            if (this.#particleProgress[i] < 1) continue;

            this.#particleProgress[i] = 0;
            const offset = i % 100;
            this.#particlePositions[i * 3] = path.source.x + this.#particleJitters[offset * 3];
            this.#particlePositions[i * 3 + 1] = path.source.y + this.#particleJitters[offset * 3 + 1];
            this.#particlePositions[i * 3 + 2] = path.source.z + this.#particleJitters[offset * 3 + 2];
        }
    }
}