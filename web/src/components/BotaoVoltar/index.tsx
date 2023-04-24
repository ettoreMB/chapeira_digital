import { Container } from './styles'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'
import { FaHome } from 'react-icons/fa'
import { RiHomeGearFill } from 'react-icons/ri'
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
      {/* <Image src={Arrow} alt="" width={24} height={32} /> */}
      {admin ? <RiHomeGearFill size={26} /> : <FaHome size={26} />}
      MENU
    </Container>
  )
}
