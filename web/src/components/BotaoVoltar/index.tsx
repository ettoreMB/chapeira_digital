import { Container, VoltarContainer } from './styles'
import { useRouter } from 'next/router'

import { RiHomeGearFill } from 'react-icons/ri'
// import { AiOutlineArrowLeft } from 'react-icons/ai'
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
    <Container>
      {/* <VoltarContainer onClick={() => router.back()}>
        <AiOutlineArrowLeft width={24} />
        Voltar
      </VoltarContainer> */}
      {admin && (
        <VoltarContainer onClick={() => VoltarLink()}>
          <RiHomeGearFill size={26} />
          Menu
        </VoltarContainer>
      )}
      {titulo && titulo}
    </Container>
  )
}
