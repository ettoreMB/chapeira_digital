import { useRouter } from 'next/router'
import Button from '../Button'
import { Container } from './styles'
import {
  AiOutlineWhatsApp,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai'
export default function ErroCarregarPagina() {
  const router = useRouter()

  function handlerecarregarPagina() {
    router.reload()
  }
  return (
    <Container>
      <h1>Erro ao carregar a pagina</h1>
      <Button onClick={handlerecarregarPagina}>recarregar página</Button>
      <div>
        <span>Se o erro persistir entre em contato com nosso suporte</span>
        <span>
          <AiOutlineMail />
          Email: suporte@chapeira.com.br
        </span>
        <span>
          <AiOutlineWhatsApp /> Whatsapp: 11 32308580
        </span>
        <span>
          <AiOutlinePhone />
          Telefone: 11 32308580
        </span>
      </div>
    </Container>
  )
}
