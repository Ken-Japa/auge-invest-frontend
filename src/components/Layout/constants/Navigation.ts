interface NavigationItem {
  name: string;
  path: string;
  icon?: React.ElementType;
  highlight?: boolean;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  name: string;
  path: string;
  icon?: React.ElementType;
}

export const publicNavigation: NavigationItem[] = [
  { name: "Início", path: "/" },
  { name: "Quem Somos", path: "/visitante/quem-somos" },
  { name: "Soluções", path: "/visitante/recursos" },
  { name: "FAQ", path: "/visitante/faq" },
  { name: "Preços", path: "/visitante/precos", highlight: true },
  { name: "Contato", path: "/visitante/contato" },
  { name: "Blog", path: "/blog" },
];

export const authNavigation: NavigationItem[] = [
  { name: "Visão Economia", path: "/visao-economia" },
  { name: "Posições", path: "/dashboard" },
  { name: "Empresas", path: "/empresa" },
  { name: "Alertas", path: "/alertas" },
  {
    name: "Ativos",
    path: "/ativos",
    dropdown: [
      { name: "Fundos Imobiliários", path: "/fii" },
      { name: "BDRs", path: "/bdr" },
      { name: "ETFs", path: "/etf" },
    ],
  },
  { name: "Análise", path: "/fundamentalista" },
  { name: "Blog", path: "/blog" },
];
