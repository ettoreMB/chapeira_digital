import ContatoDeEmergenciaForm from '@/components/ContatoDeEmergenciaForm'

import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'
import Layout from '@/layout'
import ContatoDeEmergenciaService from '@/services/ContatoDeEmergenciaService'
import toast from '@/utils/toast'

import { useContext, useRef } from 'react'

interface ContatoDeEmergenciaProps {
  lojaSigla: string
  contato: string
  telefone: string
  descricao: string
}

export default function NovoContatoDeEmergencia() {
  const { lojaSigla } = useContext(lojaSiglaContext)
  const contatoFormRef = useRef<any>()
  async function handleSubmit(contatoData: ContatoDeEmergenciaProps) {
    try {
      await ContatoDeEmergenciaService.criar({
        lojaSigla,
        contato: contatoData.contato,
        telefone: contatoData.telefone,
        descricao: contatoData.descricao,
      })
      contatoFormRef.current.resetarCampos()
    } catch (error) {
      toast({ text: 'Erro ao cadastrar Contato de emergência', type: 'danger' })
    }
  }
  return (
    <Layout botaoVoltar admin>
      <ContatoDeEmergenciaForm
        titulo="Novo Contato de Emergência"
        onSubmit={handleSubmit}
        ref={contatoFormRef}
      />
    </Layout>
  )
}
