import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { api } from '@/services/api'
import Layout from '@/layout'

import OutrosDashBoard from './components/OutrosDashBoard'
import PresentesAusentes from './components/PresentesAusentes'
import BrigadistasFormados from './components/BrigadistasFormados'
import PresentesPorUniverso from './components/PresentesPorUniverso'
import BrigadistasPresentesPorZona from './components/BrigadistasPresentesPorZona'

import { somaResultados } from '@/utils/somaResultadoLojas'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DashboadContainer } from './styles'

export default function DashBoard() {
  const router = useRouter()
  const { loja } = router.query
  const [dados, setDados] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  const carregarDados = useCallback(async () => {
    try {
      const { data } = await api.get(`/lojas/dashBoard/${loja}`)
      setDados(data)
    } catch {
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [loja])

  useEffect(() => {
    setCarregando(true)
    if (router.isReady) {
      carregarDados()
    }
    return () => {}
  }, [carregarDados, router.isReady])

  return (
    <Layout botaoVoltar carregando={carregando} erroCarregar={erro}>
      <DashboadContainer>
        <PresentesAusentes
          titulo="Colaboradores"
          bg="primary"
          presentes={somaResultados(dados, 'colaboradores_presentes')}
          ausentes={somaResultados(dados, 'colaboradores_ausentes')}
        />
        <PresentesAusentes
          titulo="Brigadistas"
          bg="danger"
          presentes={somaResultados(dados, 'brigadistas_presentes')}
          ausentes={somaResultados(dados, 'brigadistas_ausentes')}
        />
      </DashboadContainer>

      <BrigadistasFormados
        totalBrigadistas={somaResultados(dados, 'total_brigadistas')}
        totalNaoBrigadistas={somaResultados(
          dados,
          'total_colaboradores_nao_brigadistas',
        )}
        data={dados}
      />

      <BrigadistasPresentesPorZona
        totalPresentes={somaResultados(dados, 'brigadistas_presentes')}
        totalAusentes={somaResultados(dados, 'brigadistas_ausentes')}
        data={dados}
      />

      <PresentesPorUniverso
        totalBrigadistas={somaResultados(dados, 'total_brigadistas')}
        totalNaoBrigadistas={somaResultados(
          dados,
          'total_colaboradores_nao_brigadistas',
        )}
        data={dados}
      />

      <OutrosDashBoard data={dados} />
    </Layout>
  )
}
