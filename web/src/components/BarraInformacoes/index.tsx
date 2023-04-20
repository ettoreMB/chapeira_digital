import useBarraDeInformacoes from '@/hooks/useBarraDeInformacoes'
import Informacao from '../informacao'

import Spinner from '../Spinner'

import { Container, ErroContainer, Loading } from './styles'

export default function BarraInformacoes() {
  const { dados, erro, carregando } = useBarraDeInformacoes()

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
              informacao={{ titulo: 'Ausentes', valor: dados?.offline }}
              tipo="offline"
            />
          </>
        )}
      </div>
    </Container>
  )
}
