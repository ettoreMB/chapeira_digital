import { useContext } from 'react'
import Link from 'next/link'
import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'
import Layout from '@/layout'
import { useRouter } from 'next/router'

export default function AdminHome() {
  const { lojaId } = useContext(lojaSiglaContext)
  const { loja } = useRouter().query

  return (
    <Layout botaoVoltar admin>
      <h1>adminn</h1>
      <Link
        href={{
          pathname: `/[loja]/admin/listaUniversos`,
          query: { loja },
        }}
      >
        Universos
      </Link>
      <Link
        href={{
          pathname: `/[loja]/admin/listaColaboradores`,
          query: { loja },
        }}
      >
        Colaboradores
      </Link>
      <Link
        href={{
          pathname: `/[loja]/admin/[id]/editarLoja`,
          query: { loja, id: lojaId },
        }}
      >
        Loja
      </Link>
      <Link
        href={{
          pathname: '/[loja]/admin/listaContatosDeEmergencia',
          query: { loja },
        }}
      >
        CONTATOs EMERGENCIA
      </Link>
    </Layout>
  )
}
