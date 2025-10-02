'use client'
import { Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { TabPanel } from '@/components/Data-Display/TabPanel'

import BDRSearchBar from '../../../components/BDR/components/SearchBar'
import VisualizacaoBDRs from '../../../components/BDR/components/Vizualização'
import { BDRTabsContainer } from '../../styled'

interface BDRTabsProps {
  viewMode: string
  onChangeView: (mode: string) => void
  onError: (message: string) => void
  defaultPageSize?: number
}

export const BDRTabs: React.FC<BDRTabsProps> = ({ viewMode, onChangeView, onError, defaultPageSize }) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    if (newValue === 0) onChangeView('cartao')
    else if (newValue === 1) onChangeView('tabela')
    else if (newValue === 2) onChangeView('grid')
  }

  useEffect(() => {
    if (viewMode === 'cartao') setTabValue(0)
    else if (viewMode === 'tabela') setTabValue(1)
    else if (viewMode === 'grid') setTabValue(2)
  }, [viewMode])

  return (
    <BDRTabsContainer>
      <BDRSearchBar />
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="Modos de visualização de BDRs"
        centered
      >
        <Tab label="Cartões" />
        <Tab label="Tabela" />
        <Tab label="Grade" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <VisualizacaoBDRs mode="card" filter={{}} onError={onError} defaultPageSize={defaultPageSize} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <VisualizacaoBDRs mode="table" filter={{}} onError={onError} defaultPageSize={defaultPageSize} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <VisualizacaoBDRs mode="grid" filter={{}} onError={onError} defaultPageSize={defaultPageSize} />
      </TabPanel>
    </BDRTabsContainer>
  )
}
