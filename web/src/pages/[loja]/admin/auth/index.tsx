import FormGroup from '@/components/FormGroup'
import { Container, Form } from './styles.style'
import { StyledInput } from '@/components/StyledInput'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { AxiosError } from 'axios'
import toast from '@/utils/toast'
import { AuthContext } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function Auth() {
  const router = useRouter()
  const { loja } = router.query
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { signIn } = useContext(AuthContext)

  function handleSenha(e: ChangeEvent<HTMLInputElement>) {
    setSenha(e.currentTarget.value)
  }
  function handleEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)
  }
  async function handleAuth(e: FormEvent) {
    e.preventDefault()
    if (email === '' || senha === '') {
      return toast({
        type: 'danger',
        text: 'todos os campos devem ser preenchidos',
      })
    }
    try {
      await signIn({ email, senha, loja })
      router.push(`/${loja}/admin`)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast({ type: 'danger', text: 'Email ou senha inaválidos' })
        }
        return toast({ type: 'danger', text: 'Erro ao fazer login' })
      }
    }
  }
  return (
    <Container>
      <h1>Chapeira Digital</h1>
      <span>{loja}</span>
      <Form onSubmit={handleAuth}>
        <FormGroup>
          <StyledInput
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
        </FormGroup>
        <FormGroup>
          <StyledInput
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={handleSenha}
          />
        </FormGroup>
        <Button>Login</Button>
        <Link
          href={{
            pathname: `/[loja]/recuperarSenha`,
            query: { loja },
          }}
        >
          <span className="spanLink">Esqueceu a senha ?</span>
        </Link>
      </Form>
    </Container>
  )
}
