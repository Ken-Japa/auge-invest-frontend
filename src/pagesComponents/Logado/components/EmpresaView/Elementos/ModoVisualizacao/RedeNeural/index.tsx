import { Network } from 'vis-network/standalone';
import { Box, Typography, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRef, useMemo, useState, useCallback } from 'react';

// Constants
import { DEFAULT_GRAPH_OPTIONS } from './constants/graphOptions';

// Components
import { IndustryDropdown } from './components/IndustryDropdown';
import { SegmentDropdown } from './components/SegmentDropdown';

// Utils
import { GraphContainer, LoadingContainer, MenuContainer, SelectedNodePathContainer } from './styled';
import { useGraphInteractions } from './utils/hooks';
import { useGraphData } from './utils/useGraphData';

const CustomGraph = dynamic(
  () => import('./components/CustomGraph').then(mod => mod.CustomGraph),
  {
    ssr: false,
    loading: () => (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    )
  }
);

interface RedeNeuralProps {
  onLoadingChange?: (loading: boolean) => void;
}

export const RedeNeural: React.FC<RedeNeuralProps> = ({ onLoadingChange }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(null);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [isGraphReady, setIsGraphReady] = useState(false);

  const memoizedOnGraphReady = useCallback(() => {
    setIsGraphReady(true);
  }, []);
  const [selectedNodePath, setSelectedNodePath] = useState<string[]>([]);
  const networkRef = useRef<Network | null>(null);

  const { graphData, isLoading, error, industriesForDropdown, segmentsForDropdown } = useGraphData(onLoadingChange);

  const { handleNodeSelection, handleSelectIndustry, handleSelectSegment, handleDoubleClick } = useGraphInteractions(
    graphData,
    setSelectedNodePath,
    networkRef,
    industriesForDropdown,
    segmentsForDropdown
  );

  const memoizedEvents = useMemo(() => ({
    deselectNode: () => {
      setSelectedNodePath([]);
    },
    doubleClick: handleDoubleClick,
    selectNode: handleNodeSelection,
  }), [handleDoubleClick, handleNodeSelection]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return <Box sx={{ p: 2 }}><Typography color="error">{error}</Typography></Box>;
  }

  return (
    <GraphContainer>
      {selectedNodePath.length > 0 && (
        <SelectedNodePathContainer>
          <Typography variant="h5" sx={{ color: 'white' }}>
            {selectedNodePath.join(' > ')}
          </Typography>
        </SelectedNodePathContainer>
      )}
      {graphData.nodes.length > 0 && (
        <CustomGraph
          graph={graphData}
          networkRef={networkRef}
          options={DEFAULT_GRAPH_OPTIONS}
          events={memoizedEvents}
          onGraphReady={memoizedOnGraphReady}
        />
      )}
      {isGraphReady && (
        <MenuContainer>
          <IndustryDropdown
            industries={industriesForDropdown}
            onSelectIndustry={(id) => {
              setSelectedIndustryId(id);
              setSelectedSegmentId(null);
              handleSelectIndustry(id);
            }}
            selectedIndustryId={selectedIndustryId}
          />
          <SegmentDropdown
            segmentsByIndustry={segmentsForDropdown}
            onSelectSegment={(id) => {
              setSelectedSegmentId(id);
              setSelectedIndustryId(null);
              handleSelectSegment(id);
            }}
            selectedSegmentId={selectedSegmentId}
          />
        </MenuContainer>
      )}
    </GraphContainer>
  );
};