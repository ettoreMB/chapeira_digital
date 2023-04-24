import { Container } from './styles'
import { useRouter } from 'next/router'

import { RiHomeGearFill } from 'react-icons/ri'

interface Props {
  admin: boolean
  titulo?: string
}
export default function BotaoVoltar({ admin, titulo }: Props) {
  const router = useRouter()
  const { loja } = router.query

  function VoltarLink() {
    if (admin) {
      return router.push(`/${loja}/admin`)
    }
    return router.push(`/${loja}`)
  }

  return (
    <Container onClick={() => VoltarLink()}>
      {admin && <RiHomeGearFill size={26} />}
      {titulo && titulo}
    </Container>
  )
}
