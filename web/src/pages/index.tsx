import ErroCarregarPagina from '@/components/ErroCarregarPagina'
import { api } from '@/services/api'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Container } from './styles/index/styles'

import { Router } from 'next/router'
import Header from '@/components/Header'

interface LojaProps {
  loja: string
  sigla: string
  pastaWEB: string
  UF: string
}

export default function Home() {
  const [lojas, setLojas] = useState([])

  const [erro, setErro] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const lojasFiltradas = useMemo(() => {
    return lojas.filter((loja: LojaProps) => {
      return loja.sigla !== 'URUGUAI' && loja.sigla !== 'SP-CENTRAL'
    })
  }, [lojas])

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      setCarregando(true)
    })

    Router.events.on('routeChangeComplete', (url) => {
      setCarregando(false)
    })
    async function carregarLojas() {
      try {
        const { data } = await api.get('/lojas/listar')
        setLojas(data)
      } catch {
        setErro(true)
      } finally {
        setCarregando(false)
      }
    }

    carregarLojas()
  }, [])

  return (
    <>
      <Header titulo={'lista de lojas'} />
      <Container>
        {!carregando && erro && <ErroCarregarPagina />}
        {lojasFiltradas?.map((loja: LojaProps) => (
          <Link key={loja.sigla} href={`/${loja.pastaWEB}`}>
            <span>{loja.loja.toLocaleUpperCase()}</span>
          </Link>
        ))}
      </Container>
    </>
  )
}
