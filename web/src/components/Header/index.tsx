import Link from 'next/link'
import {
  Container,
  LogoContainer,
  Head,
  AdminContainer,
  MenuContainer,
} from './styles'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Button from '../Button'
import { FaHome } from 'react-icons/fa'
import { useRouter } from 'next/router'

interface HeaderProps {
  titulo: string | string[] | undefined
  usuario?: string
}

export default function Header({ titulo, usuario }: HeaderProps) {
  const router = useRouter()
  const { loja } = router.query
  function VoltarLink() {
    if (usuario) {
      return router.push(`/${loja}/admin`)
    }
    return router.push(`/${loja}`)
  }
  const { signOut } = useContext(AuthContext)
  return (
    <Container>
      <Head>
        <LogoContainer>
          <Link href={`/${titulo}`}>
            <div>
              <h1>CHAPEIRA</h1>
              <span>{titulo}</span>
            </div>
          </Link>
        </LogoContainer>
        {usuario ? (
          <AdminContainer>
            <span>{usuario}</span>
            <Button danger onClick={signOut}>
              Logout
            </Button>
          </AdminContainer>
        ) : (
          <MenuContainer onClick={VoltarLink}>
            <FaHome size={20} />
            Menu
          </MenuContainer>
        )}
      </Head>
    </Container>
  )
}
