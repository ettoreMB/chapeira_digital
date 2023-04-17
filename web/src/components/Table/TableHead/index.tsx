import { Container, Th } from './styles'
interface HeaderProps {
  nome: string
  textAlign?: 'center' | 'left' | 'right'
}

interface Props {
  head: HeaderProps[]
}

export default function TableHead({ head }: Props) {
  return (
    <Container>
      <tr>
        {head.map((h) => (
          <Th textAlign={h.textAlign} key={h.nome}>
            {h.nome}
          </Th>
        ))}
      </tr>
    </Container>
  )
}
