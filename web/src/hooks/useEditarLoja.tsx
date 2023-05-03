import { api } from '@/services/api'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import toast from '@/utils/toast'
import LojaService from '@/services/LojaService'

interface LojaProps {
  id: number
  loja: string
  sigla: string
  cidade: string
  endereco: string
  telefone: string
  horario: string
  UF: string
}

export default function useEditarLoja() {
  const [lojaData, setLojaData] = useState<LojaProps>()
  const router = useRouter()
  const { loja } = router.query
  const [endereco, setEndereco] = useState('')
  const [cidade, setCidade] = useState('')
  const [telefone, setTelefone] = useState('')
  const [horario, setHorario] = useState('')

  const carregarLoja = useCallback(async () => {
    const { data } = await api.get(`/lojas/sigla/${loja}`)
    setLojaData(data)
    setHorario(data.horario)
    setCidade(data.cidade)
    setTelefone(data.telefone)
    setEndereco(data.endereco)
  }, [loja])

  function handleEndereco(e: ChangeEvent<HTMLInputElement>) {
    setEndereco(e.currentTarget.value)
  }
  function handleCidade(e: ChangeEvent<HTMLInputElement>) {
    setCidade(e.currentTarget.value)
  }
  function handleTelefone(e: ChangeEvent<HTMLInputElement>) {
    setTelefone(e.currentTarget.value)
  }
  function handleHorario(e: ChangeEvent<HTMLInputElement>) {
    setHorario(e.currentTarget.value)
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await LojaService.editarLoja(lojaData?.id, {
        cidade,
        endereco,
        horario,
        telefone,
      })
      toast({ type: 'success', text: 'Informações editadas com sucesso' })
      router.back()
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao atualizar informações' })
    }
  }
  useEffect(() => {
    if (loja) {
      carregarLoja()
    }

    return () => {}
  }, [loja, carregarLoja])

  return {
    lojaData,
    endereco,
    cidade,
    telefone,
    horario,
    handleEndereco,
    handleCidade,
    handleTelefone,
    handleHorario,
    handleSubmit,
    carregarLoja,
  }
}
