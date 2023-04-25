import ContatoDeEmergenciaForm from '@/components/ContatoDeEmergenciaForm'

import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'
import Layout from '@/layout'
import ContatoDeEmergenciaService from '@/services/ContatoDeEmergenciaService'
import toast from '@/utils/toast'
import { useRouter } from 'next/router'

import { useContext, useRef } from 'react'

interface ContatoDeEmergenciaProps {
  lojaSigla: string
  contato: string
  telefone: string
  descricao: string
}

export default function NovoContatoDeEmergencia() {
  const { lojaSigla } = useContext(lojaSiglaContext)
  const router = useRouter()

  const contatoFormRef = useRef<any>()
  async function handleSubmit(contatoData: ContatoDeEmergenciaProps) {
    if (!contatoData.contato || !contatoData.telefone) {
      return toast({
        text: 'Preencha os camps do contato',
        type: 'danger',
      })
    }
    try {
      await ContatoDeEmergenciaService.criar({
        lojaSigla,
        contato: contatoData.contato,
        telefone: contatoData.telefone,
        descricao: contatoData.descricao,
      })
      contatoFormRef.current.resetarCampos()
      toast({ text: 'Contato salvo com sucesso', type: 'success' })
      router.back()
    } catch (error) {
      console.log(error)
      toast({
        text: 'Erro ao cadastrar Contato de emergência',
        type: 'danger',
      })
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
