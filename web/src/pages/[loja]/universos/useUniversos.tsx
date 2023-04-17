import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import UniversoService from '@/services/UniversoService'

import toast from '@/utils/toast'
import { isAxiosError } from 'axios'

interface UniversoProps {
  Id: number
  Zona: string
  Andar: string
  Universo: string
}

export default function UseUniversos() {
  const router = useRouter()

  const { loja } = router.query

  const [idParaDeletar, setIdParaDeletar] = useState(0)
  const [carregando, setCarregando] = useState(false)
  const [universos, setUniversos] = useState<UniversoProps[]>([])
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState(false)
  const [modalVisivel, setModalVisivel] = useState(false)
  const universosFiltrados = useMemo(
    () =>
      universos.filter((universo: UniversoProps) => {
        return universo.Universo.toLowerCase().includes(
          busca.toLocaleLowerCase(),
        )
      }),
    [universos, busca],
  )

  const loadUniversos = useCallback(async () => {
    try {
      setCarregando(true)
      const data = await UniversoService.listarUniversos(loja)
      setUniversos(data)
    } catch {
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [loja])

  function handleBusca(e: FormEvent<HTMLInputElement>) {
    setBusca(e.currentTarget.value)
  }

  function handleAbrirModal(id: number) {
    setIdParaDeletar(id)
    setModalVisivel(true)
  }
  function handleFecharModal() {
    setModalVisivel(false)
  }
  async function handleDelete() {
    try {
      await UniversoService.deletar(idParaDeletar)
      setModalVisivel(false)
      setIdParaDeletar(0)
      toast({ text: 'Universo deleatado com sucesso', type: 'success' })
      loadUniversos()
    } catch (error) {
      setModalVisivel(false)
      if (isAxiosError(error)) {
        error.response?.status === 409
          ? toast({
              text: 'Existem Colaboradores neste universo',
              type: 'danger',
            })
          : toast({
              text: 'Erro ao excluir o universo',
              type: 'danger',
            })
      }
    }
  }

  useEffect(() => {
    if (router.isReady) {
      loadUniversos()
    }

    return () => {}
  }, [loja, router.isReady, loadUniversos])

  return {
    carregando,
    universos,
    router,
    busca,
    loja,
    universosFiltrados,
    modalVisivel,
    erro,
    idParaDeletar,
    handleBusca,
    handleFecharModal,
    handleAbrirModal,
    handleDelete,
  }
}
