import BarraInformacoes from '@/components/BarraInformacoes'
import BotaoVoltar from '@/components/BotaoVoltar'
import Header from '@/components/Header'
import { useRouter } from 'next/router'
import { ReactNode, useContext, useEffect } from 'react'
import { Container } from './styles'
import { destroyCookie, parseCookies } from 'nookies'
import Loader from '@/components/Loader'
import ErroCarregarPagina from '@/components/ErroCarregarPagina'
import { AuthContext } from '@/contexts/AuthContext'

interface LayoutProps {
  children: ReactNode
  botaoVoltar?: boolean
  admin?: boolean
  carregando?: boolean
  erroCarregar?: boolean
  barraInformacao?: boolean
}

export default function Layout({
  botaoVoltar = false,
  admin = false,
  carregando = false,
  erroCarregar = false,
  barraInformacao = false,
  children,
}: LayoutProps) {
  const router = useRouter()
  const { loja } = router.query
  const { nomeUsuario } = useContext(AuthContext)
  const { '@chapeiraDigital_token': token } = parseCookies()

  useEffect(() => {
    if (loja) {
      if (admin && !token) {
        destroyCookie(undefined, '@chapeiraDigital_token')
        router.push({
          pathname: `/[loja]/admin/auth`,
          query: { loja },
        })
      }
    }

    return () => {}
  }, [token, router, admin, loja])

  const temErro = !carregando && erroCarregar
  return (
    <>
      <Loader carregando={carregando} />
      {temErro && <ErroCarregarPagina />}
      {!temErro && (
        <>
          {admin ? (
            <Header titulo={loja} usuario={nomeUsuario} />
          ) : (
            <Header titulo={loja} />
          )}
          {barraInformacao && <BarraInformacoes />}
          <Container>
            {botaoVoltar && <BotaoVoltar admin={admin} />}

            {children}
          </Container>
        </>
      )}
    </>
  )
}
