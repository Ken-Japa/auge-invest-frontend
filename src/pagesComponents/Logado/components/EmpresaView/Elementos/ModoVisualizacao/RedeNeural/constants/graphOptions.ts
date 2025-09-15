export const DEFAULT_GRAPH_OPTIONS = {
  nodes: {
    fixed: false,
    shape: "dot",
    borderWidth: 3,
    shadow: false,
    font: {
      color: "#FFFFFF",
      size: 500,
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
      springLength: 2000,
      springConstant: 2.0,
      nodeDistance: 4000,
      damping: 0.1,
    },
    solver: "repulsion",
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true,
  },
};
