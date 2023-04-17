import { TbMoodEmpty } from 'react-icons/tb'
import { Container } from './styles'

interface Props {
  mensagem: string
}

export default function ListaVazia({ mensagem }: Props) {
  return (
    <Container>
      <TbMoodEmpty />
      {mensagem}
    </Container>
  )
}
