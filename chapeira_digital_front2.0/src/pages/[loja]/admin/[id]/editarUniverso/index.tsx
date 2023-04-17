import { useCallback, useEffect, useRef } from 'react'
import UniversoForm from '@/components/UniversoForm'
import Layout from '@/layout'
import { useRouter } from 'next/router'
import UniversoService, { CriarUniversoProps } from '@/services/UniversoService'
import toast from '@/utils/toast'

export default function Universo() {
  const router = useRouter()
  const { id } = router.query

  const universoFormRef = useRef<any>(null)

  const carregarUniverso = useCallback(async () => {
    const universo = await UniversoService.buscarUniverso(id)
    universoFormRef.current.setValoresInput(universo)
  }, [id])

  useEffect(() => {
    if (router.isReady) {
      carregarUniverso()
    }

    return () => {}
  }, [carregarUniverso, router.isReady])

  async function handleSubmit(universo: CriarUniversoProps) {
    try {
      await UniversoService.editarUniverso(Number(id), universo)
      toast({ type: 'success', text: 'Universo Editado com sucesso' })
      router.back()
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao editar universo' })
    }
  }
  return (
    <Layout botaoVoltar>
      <UniversoForm
        ref={universoFormRef}
        titulo={'Editar Universo'}
        onSubmit={handleSubmit}
      />
    </Layout>
  )
}
