import { Link } from '@mui/material'
export const ConsentimentoSection = () => (
  <>
    <p>
      A Auge Invest realiza para legitimar o tratamento de determinados dados pessoais, caso seja necessário o
      seu consentimento, este será solicitado, oportunamente, na própria área logada da plataforma, de forma
      livre, inequívoca e informada.
      <br /> <br />
      Você pode revogar o consentimento a qualquer tempo, mediante solicitação enviada para o Encarregado de
      Dados da Auge Invest através do e-mail:
      <Link href="mailto:privacidade@capitalauge.com.br" color="info">
        {' '}
        privacidade@capitalauge.com.br.
      </Link>
    </p>
  </>
)
