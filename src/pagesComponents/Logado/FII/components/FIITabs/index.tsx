'use client'
import { Tab, Tabs } from '@mui/material'
import React, { lazy, useState } from 'react'

import { TabPanel } from '@/components/Data-Display/TabPanel'
import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { ETFFilter } from '@/services/api/types/etf'
import { AtivosSearchWrapper, AtivosContainer } from '@/components/Shared-Styles/AtivosStyledComponents'

import FIISearchBar from '../../../components/FIIs/components/SearchBar'

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


  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <AtivosContainer>
      <AtivosSearchWrapper>
        <FIISearchBar />
      </AtivosSearchWrapper>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="Modos de visualização de FIIs"
        centered
      >
        <Tab label="Cartões" {...a11yProps(0)} />
        <Tab label="Tabela" {...a11yProps(1)} />
        <Tab label="Grade" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <LazyVisualizacaoFIIs
            mode="card"
            filter={filters}
            defaultPageSize={defaultPageSize}
            onError={onError}
          />
        </SuspenseWrapper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <LazyVisualizacaoFIIs
            mode="table"
            filter={filters}
            defaultPageSize={defaultPageSize}
            onError={onError}
          />
        </SuspenseWrapper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <SuspenseWrapper fallback={<ContentSkeleton type="card" height={800} />}>
          <LazyVisualizacaoFIIs
            mode="grid"
            filter={filters}
            defaultPageSize={defaultPageSize}
            onError={onError}
          />
        </SuspenseWrapper>
      </TabPanel>
    </AtivosContainer>
  )
}
