import React from 'react';
import { BDRVisualizationRendererProps } from '../../../types';
import CardView from '../Cards';
import TableView from '../Table';
import GridView from '../Grid';

export const BDRVisualizationRenderer: React.FC<BDRVisualizationRendererProps> = ({
  mode,
  bdrs,
}) => {
  switch (mode) {
    case 'card':
      return <CardView bdrs={bdrs} />;
    case 'table':
      return <TableView bdrs={bdrs} />;
    case 'grid':
      return <GridView bdrs={bdrs} />;
    default:
      return <CardView bdrs={bdrs} />;
  }
};