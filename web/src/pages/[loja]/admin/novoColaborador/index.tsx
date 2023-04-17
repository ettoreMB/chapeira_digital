import ColaboradorForm from '@/components/ColaboradorForm'
import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'
import Layout from '@/layout'
import ColaboradorService, {
  ColaboradorInputProps,
} from '@/services/ColaboradorService'
import toast from '@/utils/toast'

import { useContext, useRef } from 'react'

export default function NovoColaborador() {
  const { lojaSigla } = useContext(lojaSiglaContext)
  const colaboradorFormRef = useRef<any>()
  async function handleSubmit(
    colaborador: ColaboradorInputProps,
  ): Promise<void> {
    try {
      await ColaboradorService.criarColaborador(lojaSigla, colaborador)
      toast({
        type: 'success',
        text: `Colaborador ${colaborador.nome} registrado com sucesso`,
      })
      colaboradorFormRef.current.resetarCampos()
    } catch {
      toast({
        type: 'danger',
        text: `Erro ao cadastrar o colaborador`,
      })
    }
  }
  return (
    <Layout botaoVoltar admin>
      <ColaboradorForm
        titulo="Novo Colaborador"
        onSubmit={handleSubmit}
        ref={colaboradorFormRef}
      />
    </Layout>
  )
}
