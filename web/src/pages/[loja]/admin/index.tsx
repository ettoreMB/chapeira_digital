import Link from 'next/link'
import Layout from '@/layout'
import { useRouter } from 'next/router'
import { Container, LinkContainer } from './styles'
import { BsGear } from 'react-icons/bs'
export default function AdminHome() {
  const { loja } = useRouter().query

  return (
    <Layout admin>
      <Container>
        <h1>Administração Chapeira Digital</h1>

        <LinkContainer>
          <BsGear size={24} />
          <Link
            href={{
              pathname: `/[loja]/admin/listaUniversos`,
              query: { loja },
            }}
          >
            Universos
          </Link>
        </LinkContainer>

        <LinkContainer>
          <BsGear size={24} />
          <Link
            href={{
              pathname: `/[loja]/admin/listaColaboradores`,
              query: { loja },
            }}
          >
            Colaboradores
          </Link>
        </LinkContainer>

        <LinkContainer>
          <BsGear size={24} />
          <Link
            href={{
              pathname: `/[loja]/admin/editarLoja`,
              query: { loja },
            }}
          >
            Informações loja
          </Link>
        </LinkContainer>

        <LinkContainer>
          <BsGear size={24} />
          <Link
            href={{
              pathname: `/[loja]/admin/listaContatosDeEmergencia`,
              query: { loja },
            }}
          >
            Contatos de emergência
          </Link>
        </LinkContainer>
      </Container>
    </Layout>
  )
}
