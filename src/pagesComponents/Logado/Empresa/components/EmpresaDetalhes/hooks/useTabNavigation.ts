import { usePathname, useRouter,useSearchParams } from 'next/navigation';
import { useEffect,useState } from 'react';

type TabValue = 'principal' | 'dividendos' | 'derivativos' | 'analiseprecos';

interface UseTabNavigationResult {
  currentTab: TabValue;
  handleTabChange: (event: React.SyntheticEvent, newValue: TabValue) => void;
}

export const useTabNavigation = (hasDerivatives: boolean): UseTabNavigationResult => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const tabParam = searchParams.get('tab');

  // Verificar se o parâmetro de tab é válido
  const isValidTab = (tab: string | null): tab is TabValue => {
    return tab === 'principal' || tab === 'dividendos' || tab === 'derivativos' || tab === 'analiseprecos';
  };

  const [currentTab, setCurrentTab] = useState<TabValue>(isValidTab(tabParam) ? tabParam : 'principal');

  // Efeito para atualizar a aba quando o parâmetro da URL mudar
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (isValidTab(tab)) {
      // Verificar se a aba é 'derivativos' e se hasDerivatives é false
      if (tab === 'derivativos' && !hasDerivatives) {
        // Se não houver derivativos, não mudar para essa aba
        // Atualizar a URL para remover o parâmetro tab sem rolar para o topo
        const params = new URLSearchParams(searchParams.toString());
        params.delete('tab');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      } else {
        setCurrentTab(tab);
      }
    }
  }, [searchParams, hasDerivatives, pathname, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabValue) => {
    setCurrentTab(newValue);

    // Criar objeto com os parâmetros de busca atuais
    const params = new URLSearchParams(searchParams.toString());

    if (newValue === 'principal') {
      // Se for a tab principal, remover o parâmetro tab da URL
      params.delete('tab');
    } else {
      // Caso contrário, adicionar o parâmetro tab com o valor da tab selecionada
      params.set('tab', newValue);
    }

    // Atualizar a URL sem recarregar a página e sem rolar para o topo usando o router do Next.js
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { currentTab, handleTabChange };
};