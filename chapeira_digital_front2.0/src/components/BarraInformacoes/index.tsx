import { api } from '@/services/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Informacao from '../informacao'

import Spinner from '../Spinner'

import { Container, ErroContainer, Loading } from './styles'

interface DadosProps {
  brigadistas: number
  colaboradores: number
  offline: number
  terceiros: number
  visitantes: number
}

export default function BarraInformacoes() {
  const [dados, setDados] = useState<DadosProps>({
    brigadistas: 0,
    colaboradores: 0,
    offline: 0,
    terceiros: 0,
    visitantes: 0,
  })
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(false)
  const router = useRouter()
  const { loja } = router.query

  const loadData = useCallback(async () => {
    try {
      setCarregando(true)
      const { data } = await api.get(`/colaboradores/informacoes/${loja}`)
      setCarregando(false)
      setDados(data)
    } catch {
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [loja])

  useEffect(() => {
    if (router.isReady) {
      loadData()
    }
    return () => {}
  }, [loja])

  const temInformacoes = !erro && !carregando
  const temErro = !carregando && erro
  return (
    <Container>
      <div className="box">
        {carregando && (
          <Loading>
            <Spinner size={16} />
            <span>Carregando Informações</span>
          </Loading>
        )}
        {temErro && (
          <ErroContainer>
            <span>Erro ao carregar informações</span>
            <button>Recarregar</button>
          </ErroContainer>
        )}
        {temInformacoes && (
          <>
            <Informacao
              informacao={{
                titulo:
                  dados?.colaboradores > 1
                    ? 'Colaboradores Presentes'
                    : 'Colaborador Presente',
                valor: dados?.colaboradores,
              }}
              tipo="colaborador"
            />
            <Informacao
              informacao={{
                titulo:
                  dados?.brigadistas > 1
                    ? 'Brigadistas Presentes'
                    : 'Brigadista Presente',
                valor: dados?.brigadistas,
              }}
              tipo="brigadista"
            />
            <Informacao
              informacao={{
                titulo:
                  dados?.terceiros > 1
                    ? 'Terceiros Presentes'
                    : 'Terceiro Presente',
                valor: dados?.terceiros,
              }}
              tipo="terceiro"
            />
            <Informacao
              informacao={{
                titulo:
                  dados?.visitantes > 1
                    ? 'Visitates Presentes'
                    : 'Visitante Presente',
                valor: dados?.visitantes,
              }}
              tipo="servicos"
            />
            <Informacao
              informacao={{ titulo: 'offline', valor: dados?.offline }}
              tipo="offline"
            />
          </>
        )}
      </div>
    </Container>
  )
}
