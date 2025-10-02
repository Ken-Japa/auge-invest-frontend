import { Link } from '@mui/material'

export const TERMS_SECTIONS = [
  {
    id: 'info',
    title: '1. INFORMAÇÕES GERAIS',
    content: (
      <>
        <p className="mb-5">
          A Auge Capital é uma plataforma financeira destinada a auxiliar investidores no mercado financeiro
          brasileiro, oferecendo análises detalhadas, dados históricos, gráficos e outras ferramentas
          financeiras. A plataforma é de uso pessoal e não comercial, com o objetivo de fornecer informações
          para tomadas de decisão no mercado de investimentos
        </p>
        <p className="mb-5">
          Somos uma plataforma de análise - não somos corretora, consultoria ou gestora. Seu capital nunca é
          movimentado por nós.
        </p>
        <p className="mb-5">
          Ao utilizar o Auge Capital, você deve estar ciente e concordar com nossos Termos de Serviço. Ao se
          cadastrar e optar por assinar nossos serviços, consideraremos que você compreendeu e aceitou os
          presentes Termos de Serviço.
        </p>
        <p>
          Conforme a legislação vigente, você só poderá aceitar estes Termos de Serviço e utilizar o Auge
          Capital se for maior de 18 anos e legalmente capaz, conforme os artigos 1º, 3º e 4º do Código Civil
          Brasileiro de 2002.
        </p>
      </>
    ),
  },

  {
    id: 'uso',
    title: '2. USO DO SERVIÇO, PROPRIEDADE INTELECTUAL E CONTEÚDO DOS SERVIÇOS',
    content: (
      <>
        <p className="mb-5">
          Para prestar os serviços oferecidos e aprimorar sua experiência na plataforma, será necessário
          fornecer alguns dados pessoais, que devem ser sempre exatos, corretos, atualizados e verdadeiros.
          Esses dados serão tratados conforme nossa{' '}
          <Link href="/politica-privacidade" color="info">
            Política de Privacidade.
          </Link>
        </p>
        <p className="mb-5">
          O conteúdo da plataforma Auge Capital é destinado exclusivamente para uso pessoal. Os direitos de
          propriedade intelectual pertencem exclusivamente à Auge Capital Tecnologia Ltda. É vedada a
          comercialização, reprodução, modificação, publicação ou distribuição das informações oferecidas sem
          autorização expressa.
        </p>
        <p>
          A Auge Capital não presta serviços de consultoria de investimentos nem recomendações específicas
          sobre rentabilidade, liquidez ou risco. As informações fornecidas têm caráter informativo e não se
          traduzem em recomendações financeiras, legais ou fiscais.
        </p>
      </>
    ),
  },

  {
    id: 'periodo',
    title: '3. PERÍODO DE UTILIZAÇÃO GRATUITA',
    content: (
      <>
        <p>
          Sua assinatura poderá começar com um período de utilização gratuita de vinte e um dias, destinado a
          novos e potenciais clientes. A liberação da utilização gratuita é determinada pela Auge Capital a
          seu exclusivo critério e pode ser revogada a qualquer momento.
        </p>
      </>
    ),
  },

  {
    id: 'assinatura',
    title: '4. ASSINATURA',
    content: (
      <>
        <p className="mb-5">
          A Auge Capital oferece planos de assinatura mensal, trimestral e anual. As assinaturas são renovadas
          automaticamente até que sejam canceladas. Você deve fornecer uma forma de pagamento válida, que pode
          ser atualizada. Ao assinar, você concorda que os valores relativos à sua assinatura serão cobrados
          na forma de pagamento indicada.
        </p>
      </>
    ),
  },

  {
    id: 'precos',
    title: '5. PREÇOS, FORMAS DE PAGAMENTO E COBRANÇA',
    content: (
      <>
        <p className="mb-5">
          Os preços e formas de pagamento para os planos de assinatura são detalhados na plataforma.
          Alterações nos preços ou nos planos serão notificadas com antecedência mínima de 30 dias.
        </p>
      </>
    ),
  },

  {
    id: 'limitacao',
    title: '6. LIMITAÇÃO DE USO',
    content: (
      <>
        <p className="mb-5">É vedado ao assinante:</p>
        <ul>
          <li>• Copiar, ceder, sublicenciar, vender ou reproduzir o software da plataforma.</li>
          <li>• Promover engenharia reversa ou desenvolver novo software com base na plataforma.</li>
          <li>• Utilizar o software para práticas nocivas como exploits, spamming ou spoofing.</li>
          <li>• Utilizar o software para fins diversos daqueles para os quais foi disponibilizado.</li>
        </ul>
      </>
    ),
  },

  {
    id: 'cancelamento',
    title: '7. CANCELAMENTO',
    content: (
      <>
        <p className="mb-5">
          Você pode cancelar sua assinatura a qualquer momento. Para assinaturas mensais, o acesso ao serviço
          continuará até o fim do período de faturamento. Para assinaturas trimestrais e anuais, o reembolso
          será proporcional ao período utilizado com a aplicação de uma multa de 15% sobre o total contratado.
        </p>
      </>
    ),
  },

  {
    id: 'seguranca',
    title: '8. SEGURANÇA DA CONTA E SENHAS DO USUÁRIO',
    content: (
      <>
        <p className="mb-5">
          A Auge Capital compromete-se a assegurar que as informações pessoais dos usuários sejam armazenadas
          de forma segura, garantindo proteção, privacidade e confidencialidade. A segurança das suas
          informações pessoais também depende da segurança do seu dispositivo e rede.
        </p>
      </>
    ),
  },

  {
    id: 'alteracoes',
    title: '9. ALTERAÇÕES DOS TERMOS DE SERVIÇO',
    content: (
      <>
        <p className="mb-5">
          A Auge Capital poderá revisar e atualizar estes Termos de Serviço periodicamente. É sua
          responsabilidade manter-se informado sobre as condições aqui estabelecidas.
        </p>
      </>
    ),
  },

  {
    id: 'contato',
    title: '10. CONTATO',
    content: (
      <>
        <p className="mb-5">
          Para dúvidas ou informações adicionais, entre em contato conosco pelo e-mail{' '}
          <Link color="info">capitalauge@gmail.com</Link>.
        </p>
      </>
    ),
  },
] as const
