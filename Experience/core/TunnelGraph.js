import Graph from "./Graph.js";
import { tunnelGraphData } from "./graphData.js";

export default class TunnelGraph extends Graph {
    constructor() {
        super(tunnelGraphData.vertexData, tunnelGraphData.edgeData);
    }
}