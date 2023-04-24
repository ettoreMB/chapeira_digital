import { Botao, UniversosContainer } from './styles'

import Layout from '@/layout'
import useUniversos from '../../../hooks/useUniversos'

export default function Universos() {
  const { carregando, universos, router, loja, erro } = useUniversos()
  const temUniversos = !carregando && !erro
  return (
    <>
      <Layout botaoVoltar carregando={carregando} erroCarregar={erro}>
        {temUniversos && (
          <UniversosContainer>
            <Botao
              width="100"
              onClick={() =>
                router.push({
                  pathname: '/[loja]/listaColaboradores',
                  query: { loja },
                })
              }
            >
              Todos Colaboradores
            </Botao>
            {universos?.map((universo: any) => (
              <Botao
                key={universo.Id}
                width="49"
                onClick={(e) => {
                  e.preventDefault()
                  router.push({
                    pathname: '/[loja]/listaColaboradores',
                    query: { loja, universoId: universo.Id },
                  })
                }}
              >
                {universo.Universo}
              </Botao>
            ))}
          </UniversosContainer>
        )}
      </Layout>
    </>
  )
}
