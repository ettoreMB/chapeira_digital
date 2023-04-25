import { useContext } from 'react'
import Link from 'next/link'
import Layout from '@/layout'
import { useRouter } from 'next/router'
import { Container, LinkContainer } from './styles'
import { BsGear } from 'react-icons/bs'
import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'
export default function AdminHome() {
  const router = useRouter()
  const { loja } = router.query
  const { lojaId } = useContext(lojaSiglaContext)

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
              pathname: `/[loja]/admin/listaColaboradores`,
              query: { loja, tipo: 'Visitante' },
            }}
          >
            Visitantes
          </Link>
        </LinkContainer>

        <LinkContainer>
          <BsGear size={24} />
          <Link
            href={{
              pathname: `/[loja]/admin/listaColaboradores`,
              query: { loja, tipo: 'Terceiro' },
            }}
          >
            Terceiros
          </Link>
        </LinkContainer>

        <LinkContainer>
          <BsGear size={24} />
          <Link
            href={{
              pathname: `/[loja]/admin/[id]/editarLoja`,
              query: { loja, id: lojaId },
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
