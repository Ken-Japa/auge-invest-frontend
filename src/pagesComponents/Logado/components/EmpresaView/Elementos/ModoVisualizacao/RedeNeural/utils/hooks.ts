import { useCallback } from "react";
import { Network } from "vis-network/standalone";
import { useRouter } from "next/navigation";

interface GraphData {
  nodes: any[];
  edges: any[];
}

interface DropdownItem {
  id: string;
  label: string;
  color: string;
}

interface SegmentDropdownItem {
  industryId: string;
  industryLabel: string;
  color: string;
  segments: { id: string; label: string }[];
}

export const useGraphInteractions = (
  graphData: GraphData,
  setSelectedNodePath: (path: string[]) => void,
  networkRef: React.MutableRefObject<Network | null>,
  industriesForDropdown: DropdownItem[],
  segmentsForDropdown: SegmentDropdownItem[]
) => {
  const router = useRouter();

  const findPathToNode = useCallback(
    (nodeId: string, nodes: any[], edges: any[]): string[] => {
      const path: string[] = [];
      let currentNodeId: string | undefined = nodeId;

      while (currentNodeId) {
        const currentNode = nodes.find((n) => n.id === currentNodeId);
        if (currentNode) {
          path.unshift(currentNode.label);
        }

        const incomingEdge = edges.find((edge) => edge.to === currentNodeId);
        if (incomingEdge) {
          currentNodeId = incomingEdge.from;
        } else {
          currentNodeId = undefined;
        }
      }
      return path;
    },
    []
  );

  const handleNodeSelection = useCallback(
    (params: any) => {
      if (params.nodes.length > 0) {
        const selectedId = params.nodes[0];
        const path = findPathToNode(
          selectedId,
          graphData.nodes,
          graphData.edges
        );
        setSelectedNodePath(path);
      } else {
        setSelectedNodePath([]);
      }
    },
    [findPathToNode, graphData.nodes, graphData.edges, setSelectedNodePath]
  );

  const handleSelectIndustry = useCallback(
    (industryId: string) => {
      if (networkRef.current) {
        if (industryId === "") {
          networkRef.current.fit({
            animation: { duration: 700, easingFunction: "easeInOutQuad" },
          });
          setSelectedNodePath([]);
          return;
        }

        const nodesToSelect: string[] = [];
        const selectedIndustry = industriesForDropdown.find(
          (ind) => ind.id === industryId
        );

        if (selectedIndustry) {
          // Add the industry node itself
          nodesToSelect.push(selectedIndustry.id);

          // Find all segments and companies belonging to this industry
          const industrySegments = segmentsForDropdown.find(
            (seg) => seg.industryId === industryId
          );
          if (industrySegments) {
            industrySegments.segments.forEach((segment) => {
              nodesToSelect.push(segment.id);
              // Find companies within this segment
              graphData.nodes.forEach((node) => {
                if (
                  node.id.startsWith("empresa-") &&
                  node.segment === segment.label
                ) {
                  nodesToSelect.push(node.id);
                }
              });
            });
          }
        }
        networkRef.current.selectNodes(nodesToSelect);
        networkRef.current.focus(industryId, { scale: 0.08 });
      }
    },
    [
      networkRef,
      industriesForDropdown,
      segmentsForDropdown,
      setSelectedNodePath,
      graphData.nodes,
    ]
  );

  const handleSelectSegment = useCallback(
    (segmentId: string) => {
      if (networkRef.current) {
        if (segmentId === "") {
          networkRef.current.fit({
            animation: { duration: 700, easingFunction: "easeInOutQuad" },
          });
          setSelectedNodePath([]);
          return;
        }

        const nodesToSelect: string[] = [];
        // Add the segment node itself
        nodesToSelect.push(segmentId);

        // Find all companies belonging to this segment
        graphData.nodes.forEach((node) => {
          if (
            node.id.startsWith("empresa-") &&
            node.segment &&
            `segmento-${node.segment}` === segmentId
          ) {
            nodesToSelect.push(node.id);
          }
        });
        networkRef.current.selectNodes(nodesToSelect);
        networkRef.current.focus(segmentId, { scale: 0.155 });
      }
    },
    [networkRef, setSelectedNodePath, graphData.nodes]
  );

  const handleDoubleClick = useCallback(
    (params: any) => {
      if (params.nodes && params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = graphData.nodes.find((n: any) => n.id === nodeId);

        if (node && nodeId.startsWith("empresa-")) {
          if (node.url) {
            router.push(node.url);
          }
        }
      }
    },
    [graphData, router]
  );

  return {
    findPathToNode,
    handleNodeSelection,
    handleSelectIndustry,
    handleSelectSegment,
    handleDoubleClick,
  };
};
