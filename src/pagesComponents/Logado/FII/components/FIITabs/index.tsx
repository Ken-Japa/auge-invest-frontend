'use client'
import { Tab, Tabs } from '@mui/material'
import React, { lazy, useState } from 'react'

import { TabPanel } from '@/components/Data-Display/TabPanel'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { ETFFilter } from '@/services/api/types/etf'

import { FIITabsContainer } from '../../styled'

const LazyVisualizacaoFIIs = lazy(() =>
  import('../../../components/FIIs/components/Vizualização').then((mod) => ({
    default: mod.VisualizacaoFIIs,
  })),
)

interface FIITabsProps {
  defaultPageSize?: number
  onError: (message: string) => void
}

export const FIITabs: React.FC<FIITabsProps> = ({ defaultPageSize, onError }) => {
  const [tabValue, setTabValue] = useState(0)
  const [filters, setFilters] = useState<ETFFilter>({})

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <FIITabsContainer>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="Modos de visualização de FIIs"
        centered
      >
        <Tab label="Cartões" />
        <Tab label="Tabela" />
        <Tab label="Grade" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <LazyVisualizacaoFIIs
            mode="card"
            filters={filters}
            defaultPageSize={defaultPageSize}
            onError={onError}
          />
        </SuspenseWrapper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <LazyVisualizacaoFIIs
            mode="table"
            filters={filters}
            defaultPageSize={defaultPageSize}
            onError={onError}
          />
        </SuspenseWrapper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <LazyVisualizacaoFIIs
            mode="grid"
            filters={filters}
            defaultPageSize={defaultPageSize}
            onError={onError}
          />
        </SuspenseWrapper>
      </TabPanel>
    </FIITabsContainer>
  )
}
