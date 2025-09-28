import LanguageIcon from '@mui/icons-material/Language';
import { Box,Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { dictionaryApi } from '@/services/api/endpoints/dictionary';
import { DictionaryItem } from '@/services/api/types/dictionary';

import { EmpresaDetalhada } from '../../../../types';
import { CodigosDisponiveis } from './components/CodigosDisponiveis';
import { CompanyAvatar } from './components/CompanyAvatar';
import { EmpresaChips } from './components/EmpresaChips';
import { FatosRelevantes } from './components/FatosRelevantes';
import { InformacoesAdicionais } from './components/InformacoesAdicionais';
import { VantagensRiscos } from './components/VantagensRiscos';
import { EmpresaDescricao,EmpresaInfo, EmpresaSubtitulo, EmpresaTitulo, HeaderContainer, SiteLink } from './styled';

interface EmpresaHeaderProps {
    empresa: EmpresaDetalhada;
    codigoAtivo: string;
    onCodigoChange: (codigo: string) => void;
}

export const EmpresaHeader: React.FC<EmpresaHeaderProps> = ({
    empresa,
    codigoAtivo,
    onCodigoChange
}) => {
    const [empresaInfo, setEmpresaInfo] = useState<DictionaryItem | null>(null);

    /**
     * @function encontrarInfoEmpresa
     * @description Busca as informações detalhadas da empresa na API de dicionário.
     * @returns {Promise<DictionaryItem | null>} As informações da empresa ou null se não for encontrada ou ocorrer um erro.
     */
    const encontrarInfoEmpresa = async (): Promise<DictionaryItem | null> => {
        const empresaNomeUpperCase = empresa.nome.toUpperCase();
        try {
            const response = await dictionaryApi.getDictionaryItems({ name: empresaNomeUpperCase, pageSize: 1 });
            if (response.result.length > 0) {
                return response.result[0];
            }
        } catch (error) {
            console.error("Erro ao buscar informações da empresa na API:", error);
        }
        return null;
    };

    useEffect(() => {
        /**
         * @function fetchEmpresaInfo
         * @description Função assíncrona para buscar as informações da empresa e atualizar o estado.
         */
        const fetchEmpresaInfo = async () => {
            const infoEmpresa = await encontrarInfoEmpresa();
            setEmpresaInfo(infoEmpresa);
        };
        fetchEmpresaInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [empresa.nome]);

    if (!empresa) {
        return <div>Carregando dados da empresa...</div>;
    }

    const companyName = empresa.nome.toUpperCase();

    return (
        <HeaderContainer>
            <EmpresaInfo>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 2,
                    minHeight: 80
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <CompanyAvatar companyName={companyName} size={70} />
                    </Box>
                    <Box>
                        <EmpresaTitulo variant="h2" >
                            {empresaInfo?.name || empresa.nome}
                        </EmpresaTitulo>

                        <EmpresaSubtitulo variant="subtitle1">
                            {empresa.industria} • {empresa.segmento}
                        </EmpresaSubtitulo>
                    </Box>
                </Box>

                {(empresaInfo?.link) && (
                    <SiteLink>
                        <Link
                            href={empresaInfo?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LanguageIcon fontSize="small" />
                            <Typography variant="body2">
                                {(empresaInfo?.link).replace(/^https?:\/\//, '')}
                            </Typography>
                        </Link>
                    </SiteLink>
                )}

                <EmpresaDescricao variant="body1">
                    {empresaInfo?.description}
                </EmpresaDescricao>

                <EmpresaChips
                    empresaInfo={empresaInfo}
                    valorMercado={empresa.valorMercado}
                />


                {empresaInfo && (
                    <>
                        <FatosRelevantes
                            fatos={empresaInfo.relevant_facts || []}
                        />

                        <VantagensRiscos
                            vantagens={empresaInfo.competitive_advantages || []}
                            riscos={empresaInfo.business_risks || []}
                        />

                        <InformacoesAdicionais
                            empresaInfo={empresaInfo}
                        />

                        <CodigosDisponiveis
                            codigos={empresa.codigos}
                            codigoAtivo={codigoAtivo}
                            onCodigoChange={onCodigoChange}
                        />
                    </>
                )}
            </EmpresaInfo>
        </HeaderContainer>
    );
};