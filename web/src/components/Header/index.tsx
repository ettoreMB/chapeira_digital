import Link from 'next/link'
import { Container, LogoContainer, Head, AdminContainer } from './styles'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Button from '../Button'

interface HeaderProps {
  titulo: string | string[] | undefined
  usuario?: string
}

export default function Header({ titulo, usuario }: HeaderProps) {
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
        {usuario && (
          <AdminContainer>
            <span>{usuario}</span>
            <Button danger onClick={signOut}>
              Logout
            </Button>
          </AdminContainer>
        )}
      </Head>
    </Container>
  )
}
