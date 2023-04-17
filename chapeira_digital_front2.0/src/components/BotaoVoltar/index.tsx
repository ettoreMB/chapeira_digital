import { Container } from './styles'
import Arrow from '../../assets/icons/ArrowLeft.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'

interface Props {
  admin: boolean
}
export default function BotaoVoltar({ admin }: Props) {
  const router = useRouter()
  const { lojaSigla } = useContext(lojaSiglaContext)

  function VoltarLink() {
    if (admin) {
      return router.push(`/${lojaSigla}/admin`)
    }
    return router.push(`/${lojaSigla}`)
  }

  return (
    <Container onClick={() => VoltarLink()}>
      <Image src={Arrow} alt="" width={24} height={32} />
      INÍCIO
    </Container>
  )
}
