import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import ColaboradorService from '@/services/ColaboradorService'
import toast from '@/utils/toast'

interface ColaboradoresProps {
  Id: number
  Nome: string
  Status: string
  Brigadista: string
  Administrador: string
  CheckIn_Date: string
  tb_universos: {
    Universo: string
  } | null
}

interface ColaboradorCheckInProps {
  nome: string
  acao: string
  data: string
  status: string
  universo: string | undefined
}

export default function useListaColaboradores() {
  const router = useRouter()
  const { loja, universoId, tipo } = router.query
  const [busca, setBusca] = useState('')
  const [idParadeletar, setIdParaDeletar] = useState<number>(0)
  const [carregando, setCarregando] = useState(true)
  const [colaboradores, setColaboradores] = useState<ColaboradoresProps[]>([])
  const [colaboradorStatus, setColaboradorStatus] = useState('')
  const [erro, setErro] = useState(false)
  const [colaboradorModal, setColaboradorModal] =
    useState<ColaboradorCheckInProps>()
  const [modalVisiviel, setModalVisivel] = useState(false)
  const [estaSalvando, setEstaSalvadno] = useState(false)

  const colaboradoresFiltrados = useMemo(
    () =>
      colaboradores.filter((colaborador) => {
        if (colaboradorStatus) {
          return colaborador.Status === colaboradorStatus
        }
        return colaborador.Nome.toLowerCase().includes(
          busca.toLocaleLowerCase(),
        )
      }),
    [colaboradores, busca, colaboradorStatus],
  )

  const loadColaboradores = useCallback(async () => {
    try {
      const colaboradores = await ColaboradorService.listarColaboradores(
        loja,
        universoId,
        tipo,
      )

      setColaboradores(colaboradores)
      setErro(false)
    } catch {
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [loja, tipo, universoId])

  function handleColaboradorStatusFiltro(e: FormEvent<HTMLButtonElement>) {
    if (colaboradorStatus && colaboradorStatus === e.currentTarget.value) {
      return setColaboradorStatus('')
    }

    return setColaboradorStatus(e.currentTarget.value)
  }

  async function handleCheckIn(colaborador: ColaboradoresProps) {
    setEstaSalvadno(true)
    try {
      setColaboradorModal({
        nome: colaborador.Nome,
        universo: colaborador.tb_universos?.Universo,
        status: colaborador.Status,
        acao: colaborador.Status,
        data: Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'medium',
        }).format(new Date(colaborador.CheckIn_Date)),
      })
      await ColaboradorService.CheckinCheckOut(colaborador.Id)
      await loadColaboradores()
      // toast({ type: 'success', text: 'CheckInrealizado com sucesso' })
      setModalVisivel(true)
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao fazer CheckI' })
    } finally {
      setEstaSalvadno(false)
    }
  }

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
      await ColaboradorService.deletar(idParadeletar)
      toast({ type: 'success', text: 'Colaborador desativado com sucesso' })
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao desativar colaborador' })
    }
  }

  useEffect(() => {
    if (loja) {
      loadColaboradores()
    }
  }, [tipo, universoId, loadColaboradores, loja])

  return {
    loja,
    busca,
    colaboradores,
    colaboradorStatus,
    colaboradoresFiltrados,
    carregando,
    erro,
    colaboradorModal,
    modalVisiviel,
    estaSalvando,
    setErro,
    handleCheckIn,
    handleBusca,
    handleColaboradorStatusFiltro,
    handleFecharModal,
    handleAbrirModal,
    handleDelete,
  }
}
