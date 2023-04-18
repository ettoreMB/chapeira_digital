import ColaboradorService from '@/services/ColaboradorService'
import { api } from '@/services/api'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'
type CredenciaisProps = {
  email: string
  senha: string
}
export type AuthContextData = {
  signIn(credenciais: CredenciaisProps): Promise<void>
  signOut: () => void
  estaAutenticado: boolean
  nomeUsuario: string
}
type AuthProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [nomeUsuario, setNomeUsuario] = useState('')
  const estaAutenticado = !!nomeUsuario
  const cookies = parseCookies()
  const router = useRouter()
  const { loja } = router.query
  useEffect(() => {
    setNomeUsuario(cookies['@chapeiraDigital_usuario'])
  }, [cookies])

  async function signIn({ email, senha }: CredenciaisProps) {
    try {
      const { token, nome } = await ColaboradorService.auth(email, senha)

      setCookie(undefined, '@chapeiraDigital_token', token, {
        path: '/',
      })
      setCookie(undefined, '@chapeiraDigital_usuario', nome, {
        path: '/',
      })
      setNomeUsuario(nome)
      api.defaults.headers.Authorization = `Bearer ${token}`
      return token
    } catch (error) {
      return error
    }
  }

  function signOut() {
    destroyCookie(undefined, '@chapeiraDigital_token', {
      path: '/',
    })
    destroyCookie(undefined, '@chapeiraDigital_usuario', {
      path: '/',
    })
    router.push({
      pathname: `/[loja]/admin/auth`,
      query: { loja },
    })
  }
  return (
    <AuthContext.Provider
      value={{ estaAutenticado, signIn, signOut, nomeUsuario }}
    >
      {children}
    </AuthContext.Provider>
  )
}
