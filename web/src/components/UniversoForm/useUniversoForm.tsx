import { FormEvent, SyntheticEvent, useImperativeHandle, useState } from 'react'

interface UniversoProps {
  Id: number
  Zona: string
  Andar: string
  Universo: string
}
interface UseUniverseProps {
  ref: any
  onSubmit: (() => Promise<void>) | ((data: any) => Promise<void>)
}
export default function UseUniversoForm({ ref, onSubmit }: UseUniverseProps) {
  const [universoNome, setUniversoNome] = useState('')
  const [andar, setAndar] = useState('')
  const [zona, setZona] = useState('')

  useImperativeHandle(
    ref,
    () => ({
      setValoresInput: (universo: UniversoProps) => {
        setUniversoNome(universo.Universo ?? '')
        setAndar(universo.Andar ?? '')
        setZona(universo.Zona ?? '')
      },
      resetarCampos: () => {
        setUniversoNome('')
        setAndar('')
        setZona('')
      },
    }),
    [],
  )

  function handleUniversoNome(e: FormEvent<HTMLInputElement>) {
    setUniversoNome(e.currentTarget.value)
  }
  function handleAndar(e: FormEvent<HTMLInputElement>) {
    setAndar(e.currentTarget.value)
  }
  function handleZona(e: FormEvent<HTMLInputElement>) {
    setZona(e.currentTarget.value)
  }
  async function handleSubmit(e: SyntheticEvent): Promise<void> {
    e.preventDefault()
    onSubmit({
      universoNome,
      zona,
      andar,
    })
  }

  return {
    universoNome,
    andar,
    zona,
    handleUniversoNome,
    handleAndar,
    handleZona,
    handleSubmit,
  }
}
