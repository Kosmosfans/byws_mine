import Graph from "./Graph.js";
import { coalGraphData } from "./graphData.js";

export default class CoalGraph extends Graph {
    constructor() {
        super(coalGraphData.vertexData, coalGraphData.edgeData);
    }
}