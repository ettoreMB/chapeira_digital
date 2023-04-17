import Layout from '@/layout'
import { api } from '@/services/api'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Card } from './styles'

interface ContatoProps {
  Descricao: string
  Telefone: string
}

export default function ContatosDeEmergencia() {
  const route = useRouter()
  const { loja } = route.query
  const [contatos, setContatos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  const loadContatos = useCallback(async () => {
    try {
      const { data } = await api.get(`/contatosEmergencia/${loja}`)
      setContatos(data)
    } catch {
      setErro(true)
    } finally {
      setCarregando(false)
    }
  }, [loja])

  useEffect(() => {
    if (route.isReady) {
      loadContatos()
    }
    return () => {}
  }, [route.isReady, loadContatos])
  return (
    <Layout botaoVoltar carregando={carregando} erroCarregar={erro}>
      <>
        {contatos.map((contato: ContatoProps) => (
          <Card key={Math.random()}>
            <h1>{contato.Descricao}</h1>
            <strong>{contato.Telefone}</strong>
          </Card>
        ))}
      </>
    </Layout>
  )
}
