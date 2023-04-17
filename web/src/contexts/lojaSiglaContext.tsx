import LojaService from '@/services/LojaService'

import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

interface LojaSiglaContextProps {
  lojaSigla: string
  lojaPastaWeb: string
  lojaId: number
}
interface LojaSiglaContextProviderProps {
  children: ReactNode
}
export const lojaSiglaContext = createContext({} as LojaSiglaContextProps)

export function LojaSiglaProvider({ children }: LojaSiglaContextProviderProps) {
  const router = useRouter()
  const { loja } = router.query
  const [lojaSigla, setLojaSigla] = useState('')
  const [lojaPastaWeb, setLojaPastaWeb] = useState('')
  const [lojaId, setLojaId] = useState(0)
  const buscarLoja = useCallback(async () => {
    try {
      const data = await LojaService.buscarLoja(loja)
      setLojaSigla(data.sigla)
      setLojaPastaWeb(data.pastaWEB)
      setLojaId(data.id)
    } catch {
      router.push('/')
    }
  }, [loja, router])

  useEffect(() => {
    if (router.isReady && loja) {
      if (!loja) {
        router.push('/')
      }
      buscarLoja()
    }

    return () => {}
  }, [buscarLoja, router.isReady, loja, router])

  return (
    <lojaSiglaContext.Provider value={{ lojaSigla, lojaPastaWeb, lojaId }}>
      {children}
    </lojaSiglaContext.Provider>
  )
}
