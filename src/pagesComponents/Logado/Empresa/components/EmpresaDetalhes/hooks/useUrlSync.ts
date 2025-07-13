import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EmpresaDetalhada } from "../../../types";

interface UseUrlSyncProps {
  empresa: EmpresaDetalhada | null;
  codigoAtivo: string | null;
  setCodigoAtivo: (codigo: string) => void;
}

interface UseUrlSyncResult {
  handleCodigoChange: (codigo: string) => void;
}

export const useUrlSync = ({
  empresa,
  codigoAtivo,
  setCodigoAtivo,
}: UseUrlSyncProps): UseUrlSyncResult => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Efeito para sincronizar o código ativo com a URL
  useEffect(() => {
    // Extrair o código da URL atual
    const pathParts = pathname.split("/");
    const slugIndex = pathParts.findIndex((part) => part === "empresa") + 1;

    if (slugIndex > 0 && slugIndex < pathParts.length) {
      const urlCodigo = pathParts[slugIndex].toUpperCase();

      // Verificar se o código na URL é diferente do código ativo atual
      // e se é um código válido para esta empresa
      if (empresa && codigoAtivo !== urlCodigo) {
        const codigoExiste = empresa.codigos.some(
          (c) => c.codigo.toUpperCase() === urlCodigo
        );

        if (codigoExiste) {
          setCodigoAtivo(urlCodigo);
        }
      }
    }
  }, [empresa, pathname, codigoAtivo, setCodigoAtivo]);

  const handleCodigoChange = (codigo: string) => {
    setCodigoAtivo(codigo);

    // Atualizar a URL com o código selecionado
    // Extrair o slug da URL atual
    const pathParts = pathname.split("/");
    const slugIndex = pathParts.findIndex((part) => part === "empresa") + 1;

    if (slugIndex > 0 && slugIndex < pathParts.length) {
      // Construir nova URL com o código selecionado
      pathParts[slugIndex] = codigo;

      // Manter os parâmetros de busca existentes (como tab)
      const newPath = pathParts.join("/");

      // Criar objeto com os parâmetros de busca atuais
      const params = new URLSearchParams(searchParams.toString());

      // Atualizar a URL sem recarregar a página e sem rolar para o topo usando o router do Next.js
      router.push(`${newPath}?${params.toString()}`, { scroll: false });
    }
  };

  return { handleCodigoChange };
};
