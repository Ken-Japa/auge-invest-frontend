import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { IconButton, Tooltip } from '@mui/material';

import { ViewControls } from './styled';
import { ViewMode } from './types';

interface ModoVisualizacaoProps {
    viewMode: ViewMode;
    onChangeView: (mode: ViewMode) => void;
}

export const ModoVisualizacao = ({ viewMode, onChangeView }: ModoVisualizacaoProps) => {
    const viewOptions = [
        {
            mode: 'neural' as ViewMode,
            icon: <BubbleChartIcon />,
            label: 'Visualização em Rede Neural'
        },
        {
            mode: 'tabela' as ViewMode,
            icon: <TableRowsIcon />,
            label: 'Visualização em Tabela'
        },
        {
            mode: 'cartao' as ViewMode,
            icon: <GridViewIcon />,
            label: 'Visualização em Cartões'
        },
        {
            mode: 'arvore' as ViewMode,
            icon: <AccountTreeIcon />,
            label: 'Visualização em Árvore'
        }
    ];

    return (
        <ViewControls>
            {viewOptions.map((option) => (
                <Tooltip key={option.mode} title={option.label} arrow placement="top">
                    <IconButton
                        onClick={() => onChangeView(option.mode)}
                        color={viewMode === option.mode ? 'primary' : 'default'}
                        aria-label={option.label}
                    >
                        {option.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </ViewControls>
    );
};