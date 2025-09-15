import { EmpresaNode } from '../types';
import { calculatePosition, calculateNodeSize, adjustColorHSL } from '../utils/graphUtils';
import { formatCurrency } from '../../utils/currency';


export const createEmpresaNode = (
    empresa: EmpresaNode,
    empIndex: number,
    empArray: EmpresaNode[],
    maxValue: number,
    segmentColor: string,
    radius: number,
    segmentAngle: number,
    empresaSector: number
) => {
    const empresaAngle = segmentAngle - (empresaSector * 0.4) +
        (empresaSector * (empIndex / (empArray.length - 1 || 1)));

    const position = calculatePosition(
        empIndex,
        empArray.length,
        radius,
        empresaAngle,
        empresaSector
    );

    const empresaColor = adjustColorHSL(segmentColor, {
        s: 0.1,
        l: -0.1
    });


    let companyUrl = '';
    if (empresa.codigos && empresa.codigos.length > 0) {
        companyUrl = `/empresa/${empresa.codigos[0].codigo}`;
    } else {
        companyUrl = `/empresa/${encodeURIComponent(empresa.empresa)}`;
    }

    return {
        id: `empresa-${empresa.empresa}-${empIndex}`,
        label: `${empresa.empresa}\n${formatCurrency(empresa.valorMercado)}`,
        x: position.x,
        y: position.y,
        size: calculateNodeSize(empresa.valorMercado, 10, maxValue, 10 * 0.8, 10 * 2.5),
        font: { size: 60 },
        color: {
            background: empresaColor,
            border: empresaColor,
            highlight: { background: empresaColor, border: '#FFFFFF' }
        },
        url: companyUrl,
        title: `Duplo clique para ver os detalhes de ${empresa.empresa} (${empresa.codigos?.[0]?.codigo || ''})`
    };
};