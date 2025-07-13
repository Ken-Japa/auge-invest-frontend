import { useState, useEffect } from "react";
import { EmpresaDetalhada, Codigo } from "../../../types";
import {
  getEmpresaBySlug,
  getCodigoPrincipal,
  getAllEmpresas,
} from "../services/empresaService";

interface UseEmpresaDataResult {
  empresa: EmpresaDetalhada | null;
  loading: boolean;
  error: string | null;
  codigoAtivo: string | null;
  setCodigoAtivo: (codigo: string) => void;
}

export const useEmpresaData = (
  slug: string,
  codigoSelecionado?: string
): UseEmpresaDataResult => {
  const [empresa, setEmpresa] = useState<EmpresaDetalhada | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [codigoAtivo, setCodigoAtivo] = useState<string | null>(
    codigoSelecionado || null
  );

  // Fetch empresa data
  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        setLoading(true);

        // Verificar se o slug é um código de ativo
        let empresaData: EmpresaDetalhada | null = null;
        let codigoAtivoFinal = codigoSelecionado;

        // Primeiro, tenta buscar como nome da empresa ou código
        const result = await getEmpresaBySlug(slug);
        empresaData = result.empresa;

        // Se encontrou por código, usar esse código como ativo
        if (result.codigoEncontrado && !codigoSelecionado) {
          codigoAtivoFinal = result.codigoEncontrado.toUpperCase();
        }

        // Se não encontrou, tentar buscar como código em todas as empresas
        if (!empresaData) {
          // Buscar todas as empresas para encontrar a que tem o código correspondente ao slug
          const todasEmpresas = await getAllEmpresas();

          for (const emp of todasEmpresas) {
            const codigoEncontrado = emp.codigos.find(
              (cod: Codigo) => cod.codigo.toUpperCase() === slug.toUpperCase()
            );

            if (codigoEncontrado) {
              empresaData = emp;
              // Se o slug era um código e não foi fornecido um codigoSelecionado,
              // então o código do slug deve ser o selecionado
              if (!codigoSelecionado) {
                codigoAtivoFinal = slug.toUpperCase();
              }
              break;
            }
          }
        }

        if (!empresaData) {
          setError("Empresa não encontrada");
          return;
        }

        setEmpresa(empresaData);

        // Define o código ativo
        if (codigoAtivoFinal) {
          setCodigoAtivo(codigoAtivoFinal);
        } else {
          // Se não tiver código selecionado, seleciona o principal
          setCodigoAtivo(getCodigoPrincipal(empresaData.codigos));
        }
      } catch (err) {
        console.error("Erro ao carregar dados da empresa:", err);
        setError("Falha ao carregar dados da empresa");
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, [slug, codigoSelecionado]);

  return { empresa, loading, error, codigoAtivo, setCodigoAtivo };
};
