import Button from '@/components/Button'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Form, Container, FormGroup, Input } from './styles'
import toast from '@/utils/toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { api } from '@/services/api'
import { useRouter } from 'next/router'

export default function RecuperarSenhaForm() {
  const router = useRouter()
  const { loja, token } = router.query
  const [senha, setSenha] = useState('')
  const [repetirSenha, setRepetirSenhaSenha] = useState('')
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  function handleSenha(e: ChangeEvent<HTMLInputElement>) {
    setSenha(e.target.value)
  }
  function handleRepetirSenha(e: ChangeEvent<HTMLInputElement>) {
    setRepetirSenhaSenha(e.target.value)
  }
  function handleSenhaVisivel() {
    setSenhaVisivel(!senhaVisivel)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (senha !== repetirSenha) {
      return toast({ type: 'danger', text: 'as senhas devem ser identicas' })
    }
    if (!senha && !repetirSenha) {
      return toast({
        type: 'danger',
        text: 'todos os campos devem ser preenchidos',
      })
    }
    try {
      await api.post(
        `/colaboradores/novaSenha/${loja}`,
        {
          token,
          senha,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      toast({ type: 'success', text: 'Senha registrada com sucesso' })
      router.push({
        pathname: `/[loja]/admin/auth`,
        query: { loja },
      })
    } catch (error) {
      toast({ type: 'danger', text: 'Erro ao cadastrar senha' })
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            placeholder="Nova senha"
            type={senhaVisivel ? 'text' : 'password'}
            value={senha}
            onChange={handleSenha}
          />
          {senhaVisivel ? (
            <AiOutlineEye size={32} onClick={handleSenhaVisivel} />
          ) : (
            <AiOutlineEyeInvisible size={32} onClick={handleSenhaVisivel} />
          )}
        </FormGroup>

        <FormGroup>
          <Input
            placeholder="Repetir senha"
            type="password"
            value={repetirSenha}
            onChange={handleRepetirSenha}
          />
        </FormGroup>

        <Button width={100}>Enviar</Button>
      </Form>
    </Container>
  )
}
