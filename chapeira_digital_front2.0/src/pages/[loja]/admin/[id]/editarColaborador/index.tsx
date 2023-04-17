import { useCallback, useEffect, useRef } from 'react'
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

  const colaboradorRef = useRef<any>(null)

  const carregarColaborador = useCallback(async () => {
    const colaborador = await ColaboradorService.buscarColaborador(id)

    colaboradorRef.current.setValoresInput(colaborador)
  }, [id])

  async function handleSubmit(colaborador: ColaboradorInputProps) {
    try {
      await ColaboradorService.editar(id, colaborador)
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao editar colaborador' })
    }
  }

  useEffect(() => {
    if (router.isReady) {
      carregarColaborador()
    }

    return () => {}
  }, [carregarColaborador, router.isReady])

  return (
    <Layout botaoVoltar>
      <ColaboradorForm
        titulo="Editar Colaborador"
        ref={colaboradorRef}
        onSubmit={handleSubmit}
      />
    </Layout>
  )
}
