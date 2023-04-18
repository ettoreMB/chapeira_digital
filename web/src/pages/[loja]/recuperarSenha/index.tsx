import { StyledInput } from '@/components/StyledInput'
import { Container, Form } from './styles'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import { api } from '@/services/api'
import toast from '@/utils/toast'

export default function RecuperarSenha() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const { loja } = router.query
  const [enviando, setEnviando] = useState(false)

  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      if (!email.trim()) {
        return toast({ text: 'Preencha o campo de email', type: 'danger' })
      }
      setEnviando(true)
      await api.post('/colaboradores/recuperarSenha', {
        email,
        loja,
      })
      toast({
        text: 'Email enviado, confira sua caixa de email',
        type: 'success',
      })
      setEnviando(false)
      router.back()
    } catch (error) {
      toast({ text: 'Erro ao enviar email', type: 'danger' })
    } finally {
      setEnviando(false)
    }
  }
  return (
    <Container>
      <h2>Informe seu email para receber um link para recuperar sua senha.</h2>
      <Form onSubmit={handleSubmit}>
        <StyledInput
          placeholder="email"
          onChange={handleEmail}
          value={email}
          type="email"
        />
        <Button isLoading={enviando}>Enviar</Button>
      </Form>
    </Container>
  )
}
