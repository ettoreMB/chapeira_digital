import ErroCarregarPagina from '@/components/ErroCarregarPagina'
import { api } from '@/services/api'
import Link from 'next/link'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Container } from './styles/index/styles'

import Select from '@/components/Select'
import { Router } from 'next/router'

interface LojaProps {
  loja: string
  sigla: string
  pastaWEB: string
  UF: string
}
const estados = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]
export default function Home() {
  const [lojas, setLojas] = useState([])
  const [filtroUF, setFiltroUF] = useState('')
  const [hasError, setHasError] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const lojasFiltradas = useMemo(() => {
    return lojas.filter((loja: LojaProps) => {
      return loja.UF === filtroUF
    })
  }, [filtroUF, lojas])

  function handleMudarFiltroUF(e: ChangeEvent<HTMLSelectElement>) {
    setFiltroUF(e.currentTarget.value)
  }
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
        setHasError(true)
      } finally {
        setCarregando(false)
      }
    }

    carregarLojas()
  }, [])

  const temLojas = lojasFiltradas.length > 0
  return (
    <Container>
      {!carregando && hasError && <ErroCarregarPagina />}
      <h2>Selecione o estado</h2>
      <Select onChange={handleMudarFiltroUF} value={filtroUF}>
        <option value={''}>Escolha o Estado</option>
        {estados.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </Select>
      {temLojas && (
        <>
          <h2>Lojas encontradas</h2>
          {lojasFiltradas?.map((loja: LojaProps) => (
            <Link key={loja.sigla} href={`/${loja.pastaWEB}`}>
              <span>{loja.loja}</span>
            </Link>
          ))}
        </>
      )}
      {!temLojas && <h2>Nenhuma loja cadastrada neste estado</h2>}
    </Container>
  )
}
