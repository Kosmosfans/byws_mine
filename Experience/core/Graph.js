export default class Graph {
    constructor(vertexData, edgeData) {
        this.vertices = vertexData;
        this.edges = createEdges(edgeData, this.vertices);
    }

    getVertices() {
        return this.vertices;
    }

    getEdges() {
        return this.edges;
    }
}

function createEdges(edgeData, vertices) {
    const result = [];
    edgeData.forEach(e => {
        const v0 = vertices[e.source];
        const v1 = vertices[e.target];
        result.push({ 'source': v0, 'target': v1 });
    });
    return result;
}