import { SegmentoNode } from '../types';
import { calculatePosition, calculateNodeSize } from '../utils/graphUtils';
import { formatCurrency } from '../../utils/currency';

export const createSegmentoNode = (
    segmento: SegmentoNode,
    segIndex: number,
    segArray: SegmentoNode[],
    maxValue: number,
    segmentColor: string,
    radius: number,
    industriaAngle: number,
    industriaSector: number
) => {
    const segmentSector = industriaSector;
    const segmentAngle = industriaAngle - (industriaSector * 0.2) +
        (industriaSector * 0.8 * (segIndex / (segArray.length - 1 || 1)));

    const position = calculatePosition(
        segIndex,
        segArray.length,
        radius,
        segmentAngle,
        segmentSector / segArray.length
    );

    return {
        id: `segmento-${segmento.segmento}`,
        label: `${segmento.segmento}\n${formatCurrency(segmento.valorMercado)}`,
        x: position.x,
        y: position.y,
        size: calculateNodeSize(segmento.valorMercado, 40, maxValue),
        font: { size: 16 },
        color: {
            background: segmentColor,
            border: segmentColor,
            highlight: { background: segmentColor, border: '#FFFFFF' }
        }
    };
};