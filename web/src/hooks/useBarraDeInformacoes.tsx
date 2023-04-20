import { useCallback, useEffect, useState } from 'react'
import { api } from '@/services/api'
import { useRouter } from 'next/router'

interface DadosProps {
  brigadistas: number
  colaboradores: number
  offline: number
  terceiros: number
  visitantes: number
}

export default function useBarraDeInformacoes() {
  const [dados, setDados] = useState<DadosProps>({
    brigadistas: 0,
    colaboradores: 0,
    offline: 0,
    terceiros: 0,
    visitantes: 0,
  })

  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)
  const router = useRouter()
  const { loja } = router.query

  const loadData = useCallback(async () => {
    try {
      const { data } = await api.get(`/colaboradores/informacoes/${loja}`)
      setDados(data)
    } catch {
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [loja])

  useEffect(() => {
    if (loja) {
      loadData()
    }
    return () => {}
  }, [loja, loadData])

  return {
    carregando,
    erro,
    dados,
    loadData,
  }
}
