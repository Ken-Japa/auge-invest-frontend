import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';

import { DadosAnaliseFundamental } from '../../types';
import { FormField } from './components/FormField';
import { FormSection } from './components/FormSection';
import { FORM_SECTIONS } from './constants/constants';
import { FormContainer } from './styled';

const ALLOW_NEGATIVE_FIELDS = [
    'ebit',
    'ebitda',
    'lucroLiquido',
    'dividaLiquida',
    'impostoRenda'
];

const FIELD_WARNINGS = {
    lucroLiquido: 'Lucro negativo invalida o cálculo do P/L',
    ebitda: 'EBITDA negativo invalida o cálculo do EV/EBITDA',
    dividaLiquida: 'Valor negativo indica que o caixa supera a dívida (ativo líquido positivo)',
    ebit: 'EBIT negativo invalida o cálculo do ROIC',
    impostoRenda: 'Valor negativo indica créditos fiscais. O ROIC ajustará o lucro operacional para refletir esse benefício.'
};

export const DataInputForm = ({ control }: { control: Control<DadosAnaliseFundamental> }) => {
    return (
        <FormContainer container spacing={3}>
            {FORM_SECTIONS.map((section, index) => (
                <FormSection
                    key={index}
                    title={section.title}
                    description={section.description}
                >
                    <Grid container spacing={2}>
                        {section.fields.map((field, fieldIndex) => (
                            <FormField
                                key={fieldIndex}
                                control={control}
                                allowNegative={ALLOW_NEGATIVE_FIELDS.includes(field.name)}
                                warning={FIELD_WARNINGS[field.name as keyof typeof FIELD_WARNINGS]}
                                {...field}
                            />
                        ))}
                    </Grid>
                </FormSection>
            ))}
        </FormContainer>
    );
};