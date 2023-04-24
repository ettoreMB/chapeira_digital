import { Container } from './styles'
import { useRouter } from 'next/router'

import { FaHome } from 'react-icons/fa'
import { RiHomeGearFill } from 'react-icons/ri'
interface Props {
  admin: boolean
}
export default function BotaoVoltar({ admin }: Props) {
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
      {/* <Image src={Arrow} alt="" width={24} height={32} /> */}
      {admin ? <RiHomeGearFill size={26} /> : <FaHome size={26} />}
      MENU
    </Container>
  )
}
