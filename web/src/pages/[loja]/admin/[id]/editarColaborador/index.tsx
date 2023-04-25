import { useCallback, useEffect, useRef, useState } from 'react'
import Layout from '@/layout'
import { useRouter } from 'next/router'

import ColaboradorForm from '@/components/ColaboradorForm'
import ColaboradorService, {
  ColaboradorInputProps,
} from '@/services/ColaboradorService'

import toast from '@/utils/toast'

export default function Colaborador() {
  const router = useRouter()
  const { id } = router.query
  const [carregando, setCarregando] = useState(true)
  const colaboradorRef = useRef<any>(null)

  const carregarColaborador = useCallback(async () => {
    try {
      const colaborador = await ColaboradorService.buscarColaborador(id)

      colaboradorRef.current.setValoresInput(colaborador)
    } catch (error) {
      console.log(error)
    } finally {
      setCarregando(false)
    }
  }, [id])

  async function handleSubmit(colaborador: ColaboradorInputProps) {
    try {
      await ColaboradorService.editar(id, colaborador)

      toast({
        type: 'success',
        text: `Colaborador ${colaborador.nome} editado com sucesso`,
      })

      router.back()
    } catch (error) {
      console.log(error)
      toast({ type: 'danger', text: 'Erro ao editar colaborador' })
    }
  }

  useEffect(() => {
    if (id) {
      carregarColaborador()
    }

    return () => {}
  }, [carregarColaborador, id])

  return (
    <Layout botaoVoltar admin carregando={carregando}>
      <ColaboradorForm
        titulo="Editar Colaborador"
        ref={colaboradorRef}
        onSubmit={handleSubmit}
      />
    </Layout>
  )
}
