export const DEFAULT_GRAPH_OPTIONS = {
  nodes: {
    fixed: false,
    shape: "dot",
    borderWidth: 3,
    shadow: false,
    font: {
      color: "#FFFFFF",
      strokeWidth: 3,
      strokeColor: "#000000",
    },
    scaling: {
      min: 10,
      max: 1000,
    },
  },
  edges: {
    arrows: {
      to: false,
      from: false,
    },
    smooth: {
      enabled: true,
      type: "curvedCW",
      roundness: 0.2,
    },
    physics: true,
  },
  physics: {
    enabled: true,
    stabilization: {
      enabled: true,
      iterations: 500,
      updateInterval: 10,
    },
    repulsion: {
      centralGravity: 0.0,
      springLength: 300,
      springConstant: 0.05,
      nodeDistance: 1250,
      damping: 0.09,
    },
    solver: "repulsion",
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true,
  },
};
