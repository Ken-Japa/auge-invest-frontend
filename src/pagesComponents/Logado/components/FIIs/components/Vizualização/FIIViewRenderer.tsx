import React from 'react'

import { FIIExtended, VisualizationMode } from '../../types'
import CardView from './Cards'
import GridView from './Grid'
import TableView from './Table'

interface FIIViewRendererProps {
  mode: VisualizationMode
  fiis: FIIExtended[]
}

export const FIIViewRenderer: React.FC<FIIViewRendererProps> = ({ mode, fiis }) => {
  switch (mode) {
    case 'card':
      return <CardView fiis={fiis} />
    case 'table':
      return <TableView fiis={fiis} />
    case 'grid':
      return <GridView fiis={fiis} />
    default:
      return <CardView fiis={fiis} />
  }
}
