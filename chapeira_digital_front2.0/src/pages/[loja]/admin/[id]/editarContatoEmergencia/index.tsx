import ContatoDeEmergenciaForm from '@/components/ContatoDeEmergenciaForm'
import Layout from '@/layout'
import ContatoDeEmergenciaService, {
  CriarContatoDeEmergenciaProps,
} from '@/services/ContatoDeEmergenciaService'
import toast from '@/utils/toast'

import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'

export default function EditarContatoDeEmergencia() {
  const router = useRouter()
  const { loja, id } = router.query
  const contatoDeEmergenciaFormRef = useRef<any>(null)

  const carregarContato = useCallback(async () => {
    try {
      const contato = await ContatoDeEmergenciaService.buscar(id)

      contatoDeEmergenciaFormRef.current.setValoresInput(contato)
    } catch (error) {
      router.push(`/${loja}/admin/auth`)
    }
  }, [id])

  async function handleSubmit({
    contato,
    descricao,
    telefone,
  }: CriarContatoDeEmergenciaProps): Promise<void> {
    try {
      await ContatoDeEmergenciaService.editar(id, {
        contato,
        descricao,
        telefone,
      })
      carregarContato()
      toast({ text: 'Contato editado com sucesso', type: 'success' })
    } catch (error) {
      console.log(error)
      toast({ text: 'Erro ao editar contato', type: 'danger' })
    }
  }
  useEffect(() => {
    if (router.isReady) {
      carregarContato()
    }

    return () => {}
  }, [carregarContato, router.isReady])

  return (
    <Layout botaoVoltar>
      <ContatoDeEmergenciaForm
        titulo="Editar Contato de Emergencia"
        ref={contatoDeEmergenciaFormRef}
        onSubmit={handleSubmit}
      />
    </Layout>
  )
}
