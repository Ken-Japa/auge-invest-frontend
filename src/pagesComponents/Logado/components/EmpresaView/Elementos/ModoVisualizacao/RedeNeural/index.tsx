import { Alert, CircularProgress, Tooltip } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import CloseIcon from '@mui/icons-material/Close'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { Network } from 'vis-network/standalone'

// Components
import { IndustryDropdown } from './components/IndustryDropdown/IndustryDropdown'
import { SegmentDropdown } from './components/SegmentDropdown/SegmentDropdown'
// Constants
import { DEFAULT_GRAPH_OPTIONS } from './constants/graphOptions'
// Utils
import {
  GraphContainer,
  LoadingContainer,
  MenuContainer,
  SelectedNodePathContainer,
  StyledLoadingTypography,
  ErrorBox,
  StyledNodePathTypography,
  StyledIconButton,
  DropdownsBox,
} from './styled'
import { useGraphInteractions } from './utils/hooks'
import { useGraphData } from './utils/useGraphData'

const CustomGraph = dynamic(
  () => import('./components/CustomGraph/CustomGraph').then((mod) => mod.CustomGraph),
  {
    ssr: false,
    loading: () => (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    ),
  },
)

interface RedeNeuralProps {
  onLoadingChange?: (loading: boolean) => void
}

export const RedeNeural: React.FC<RedeNeuralProps> = ({ onLoadingChange }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(null)
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null)
  const [isGraphReady, setIsGraphReady] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const memoizedOnGraphReady = useCallback(() => {
    setIsGraphReady(true)
  }, [])
  const [selectedNodePath, setSelectedNodePath] = useState<string[]>([])
  const networkRef = useRef<Network | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const { graphData, isLoading, error, industriesForDropdown, segmentsForDropdown } =
    useGraphData(onLoadingChange)

  const { handleNodeSelection, handleSelectIndustry, handleSelectSegment, handleDoubleClick } =
    useGraphInteractions(
      graphData,
      setSelectedNodePath,
      networkRef,
      industriesForDropdown,
      segmentsForDropdown,
    )

  const memoizedEvents = useMemo(
    () => ({
      deselectNode: () => {
        setSelectedNodePath([])
      },
      doubleClick: handleDoubleClick,
      selectNode: handleNodeSelection,
    }),
    [handleDoubleClick, handleNodeSelection],
  )

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
        <StyledLoadingTypography variant="h6">Carregando dados da rede neural...</StyledLoadingTypography>
      </LoadingContainer>
    )
  }

  if (error) {
    return (
      <ErrorBox>
        <Alert severity="error">{error}</Alert>
      </ErrorBox>
    )
  }

  return (
    <GraphContainer>
      {selectedNodePath.length > 0 && (
        <SelectedNodePathContainer>
          <StyledNodePathTypography variant="h5">{selectedNodePath.join(' > ')}</StyledNodePathTypography>
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
      <MenuContainer ref={menuRef}>
        <Tooltip title={isMenuOpen ? '' : 'Buscar Indústria e Segmento'} disableHoverListener={isMenuOpen}>
          <StyledIconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <CloseIcon sx={{ fontSize: '2rem' }} />
            ) : (
              <FilterListIcon sx={{ fontSize: '2rem' }} />
            )}
          </StyledIconButton>
        </Tooltip>
        {isMenuOpen && (
          <DropdownsBox>
            <IndustryDropdown
              industries={industriesForDropdown}
              onSelectIndustry={(id) => {
                setSelectedIndustryId(id)
                setSelectedSegmentId(null)
                handleSelectIndustry(id)
              }}
              selectedIndustryId={selectedIndustryId}
            />
            <SegmentDropdown
              segmentsByIndustry={segmentsForDropdown}
              onSelectSegment={(id) => {
                setSelectedSegmentId(id)
                setSelectedIndustryId(null)
                handleSelectSegment(id)
              }}
              selectedSegmentId={selectedSegmentId}
            />
          </DropdownsBox>
        )}
      </MenuContainer>
    </GraphContainer>
  )
}
