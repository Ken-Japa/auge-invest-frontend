const baseColors = {
  primary: {
    main: '#0D95F9', // Azul principal da marca (Azul céu brilhante)
    A100: '#7DC5FC', // Azul claro para hover e elementos secundários (Azul céu claro)
    A200: '#0068BA', // Azul escuro para elementos ativos e destaques (Azul marinho médio)
    contrastText: '#FFFFFF', // Texto sobre fundo azul (Branco puro)
  },
  secondary: {
    main: '#8411CC', // Roxo principal para elementos secundários (Roxo violeta intenso)
    A100: '#A45AD3', // Roxo claro para hover (Lilás médio)
    A200: '#510083', // Roxo escuro para elementos ativos (Roxo escuro profundo)
    A300: '#3f0069', // Roxo mais escuro para hover (Roxo violeta escuro)
    contrastText: '#502E6C', // Texto sobre fundo roxo (Roxo acinzentado escuro)
  },
  info: {
    main: '#0D95F9', // Azul informativo (Azul céu brilhante - igual ao primary.main)
    A100: '#7DC5FC', // Azul claro para alertas informativos (Azul céu claro)
    A200: '#0068BA', // Azul escuro para ícones informativos (Azul marinho médio)
    contrastText: '#004C86', // Texto sobre fundo azul informativo (Azul marinho escuro)
  },
  warning: {
    main: '#FFA500', // Laranja para alertas (Laranja âmbar)
    A100: '#FCC052', // Laranja claro para hover em alertas (Laranja pastel)
    A200: '#C98302', // Laranja escuro para elementos ativos (Laranja acastanhado)
    contrastText: '#804D00', // Texto sobre fundo laranja (Marrom alaranjado escuro)
  },
  success: {
    main: '#4CAF50', // Verde para indicar sucesso e valores positivos (Verde médio)
    A100: '#A5D6A7', // Verde claro para hover (Verde menta claro)
    A200: '#2E7D32', // Verde escuro para elementos ativos (Verde floresta)
    contrastText: '#1B5E20', // Texto sobre fundo verde (Verde escuro profundo)
  },
  error: {
    main: '#FF0000', // Vermelho para erros e valores negativos (Vermelho puro)
    A100: '#F35D5D', // Vermelho claro para hover (Vermelho coral)
    A200: '#B80404', // Vermelho escuro para elementos ativos (Vermelho escuro)
    contrastText: '#860000', // Texto sobre fundo vermelho (Vermelho sangue escuro)
  },
}

export { baseColors }