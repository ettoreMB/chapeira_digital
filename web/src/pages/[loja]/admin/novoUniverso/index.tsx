import ToastContainer from '@/components/Toast/ToastContainer'
import Universoform from '@/components/UniversoForm'
import { lojaSiglaContext } from '@/contexts/lojaSiglaContext'
import Layout from '@/layout'
import UniversoService, { CriarUniversoProps } from '@/services/UniversoService'
import toast from '@/utils/toast'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useContext, useRef } from 'react'

export default function Universo() {
  const router = useRouter()
  const { lojaSigla } = useContext(lojaSiglaContext)
  const contactFormRef = useRef<any>()

  async function handleSubmit(universoData: CriarUniversoProps): Promise<void> {
    try {
      await UniversoService.criarUniverso(lojaSigla, universoData)
      contactFormRef.current.resetarCampos()
      toast({ text: 'Universo Criado com sucesso', type: 'success' })
      router.push({
        pathname: `/[loja]/admin/listaUniversos`,
        query: { loja: lojaSigla },
      })
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          return toast({
            text: 'Universo já cadastrado no sistema',
            type: 'danger',
          })
        } else {
          toast({ text: 'Erro ao criar Universo', type: 'danger' })
        }
      }
    }
  }
  return (
    <Layout admin botaoVoltar>
      <Universoform
        titulo="Novo Unviverso"
        onSubmit={handleSubmit}
        ref={contactFormRef}
      />
      <ToastContainer />
    </Layout>
  )
}
