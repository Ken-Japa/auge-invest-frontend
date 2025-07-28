import { companiesApi } from "@/services/api/endpoints/companies";
import { sumarioApi } from "@/services/api/endpoints/sumario";
import { EmpresaDetalhada, Codigo } from "../../../types";

// Função para buscar dados de uma empresa específica por slug (código ou nome)
export const getEmpresaBySlug = async (
  slug: string
): Promise<{ empresa: EmpresaDetalhada | null; codigoEncontrado?: string }> => {
  try {
    // Importar dados mock (será substituído por chamada API)

    const empresasResponse = await companiesApi.getCompanies({
      pageSize: 1000,
    });
    const empresas = empresasResponse.companies || [];

    const sumarioResponse = await sumarioApi.getSumarioItems({
      pageSize: 100,
    });

    const sumario = sumarioResponse.result || [];

    let dividendosData: any[] = [];

    // Buscar por código
    let empresa = empresas.find((emp: any) => {
      const foundByCode = emp.codigos.some((cod: any) => {
        return cod.codigo.toLowerCase() === slug.toLowerCase();
      });
      return foundByCode;
    });

    // Armazenar o código usado para encontrar a empresa
    let codigoEncontrado: string | undefined;

    if (empresa) {
      // Se encontrou por código, armazenar qual código foi usado
      codigoEncontrado = slug;
    } else {
      // Se não encontrou por código, buscar por nome
      empresa = empresas.find((emp: any) => {
        return emp.nome.toLowerCase() === slug.toLowerCase();
      });
    }

    if (!empresa) return { empresa: null };
    const dividendosResponse = await companiesApi.getCompanyDividends({
      pageSize: 1000,
      nomeEmpresa: empresa.nome,
    });

    console.log("Full dividendosResponse (getEmpresaBySlug):");
    console.log(dividendosResponse);
    console.log("dividendosResponse.data (getEmpresaBySlug):");
    console.log(dividendosResponse?.result);
    const dividendosEmpresa = dividendosResponse.result || [];

    // Buscar informações adicionais do sumário
    let valorMercado = 0;
    let participacao = 0;

    for (const industria of sumario) {
      for (const segmento of industria.segmentos) {
        const empresaDetalhe = segmento.empresasDetalhes.find(
          (emp: any) => emp.empresa.toLowerCase() === empresa.nome.toLowerCase()
        );

        if (empresaDetalhe) {
          valorMercado = empresaDetalhe.valorMercado;
          participacao = empresaDetalhe.participacao;
          break;
        }
      }
    }

    // Mapear códigos para o formato correto
    const codigosMapeados: Codigo[] = empresa.codigos.map((cod: any) => ({
      codigo: cod.codigo,
      preco: cod.preco || 0,
      variacao: cod.variacao || 0,
      "valor mercado": cod["valor mercado"] || 0,
      precoAnterior: cod.precoAnterior || 0,
    }));

    // Construir objeto com todos os detalhes
    const empresaDetalhada: EmpresaDetalhada = {
      nome: empresa.nome,
      industria: empresa.setor || "",
      segmento: empresa.subsetor || "",
      valorMercado,
      codigos: codigosMapeados,
      dividendos: dividendosEmpresa?.dividendos || [],
    };

    return { empresa: empresaDetalhada, codigoEncontrado };
  } catch (error) {
    console.error("Erro ao buscar dados da empresa:", error);
    return { empresa: null };
  }
};

// Função para buscar o código principal da empresa (geralmente ON)
export const getCodigoPrincipal = (codigos: Codigo[]): string => {
  if (!codigos || codigos.length === 0) return "";

  // Preferência para ações ON (terminadas em 3)
  const codigoON = codigos.find((cod) => cod.codigo.endsWith("3"));
  if (codigoON) return codigoON.codigo;

  // Se não encontrar ON, retorna o primeiro código
  return codigos[0].codigo;
};

// Função para buscar todas as empresas
export const getAllEmpresas = async (): Promise<EmpresaDetalhada[]> => {
  try {
    // Importar dados mock (será substituído por chamada API)

    // Tratamento seguro para os dados de empresas
    const empresasResponse = await companiesApi.getCompanies({
      pageSize: 1000,
    });

    const empresasRaw = empresasResponse.companies || [];

    const sumarioResponse = await sumarioApi.getSumarioItems({
      pageSize: 100,
    });
    const sumario = sumarioResponse.result || [];

    let dividendosData: any[] = [];
    const dividendosResponse = await companiesApi.getCompanyDividends({
      pageSize: 1000,
    });
    const dividendosEmpresa = dividendosResponse.result || [];

    // Transformar os dados brutos em EmpresaDetalhada[]
    const empresasDetalhadas: EmpresaDetalhada[] = empresasRaw.map(
      (empresa: any) => {
        // Buscar dividendos da empresa
        const dividendosEmpresa = dividendosData.find(
          (div: any) =>
            div.nomeEmpresa &&
            div.nomeEmpresa.toLowerCase() === empresa.nome.toLowerCase()
        );

        // Mapear códigos para o formato correto
        const codigosMapeados: Codigo[] = empresa.codigos.map((cod: any) => ({
          codigo: cod.codigo,
          derivativos:
            typeof cod.derivativos === "string"
              ? cod.derivativos === "true"
              : Boolean(cod.derivativos),
          preco: cod.preco || 0,
          variacao: cod.variacao || 0,
          "data inicial": cod["data inicial"] || "",
          "valor mercado": cod["valor mercado"] || 0,
          precoAnterior: cod.precoAnterior || 0,
          derivativo: cod.derivativo || [],
        }));

        // Construir objeto com todos os detalhes
        return {
          nome: empresa.nome,
          industria: empresa.industria || empresa.setor || "",
          segmento: empresa.segmento || empresa.subsetor || "",
          valorMercado: empresa.valorMercado || 0,
          codigos: codigosMapeados,
          dividendos: dividendosEmpresa?.dividendos || [],
        };
      }
    );

    return empresasDetalhadas;
  } catch (error) {
    console.error("Erro ao buscar todas as empresas:", error);
    return [];
  }
};
