import { FormEvent, SyntheticEvent, useImperativeHandle, useState } from 'react'

interface ContatoProps {
  Contato: string
  Telefone: string
  Descricao: string
}

interface UseFormProps {
  ref: any
  onSubmit: (() => Promise<void>) | ((data: any) => Promise<void>)
}

export default function UseContatodeEmergenciaForm({
  ref,
  onSubmit,
}: UseFormProps) {
  const [contato, setContato] = useState('')
  const [telefone, setTelefone] = useState('')
  const [descricao, setDescricao] = useState('')

  useImperativeHandle(
    ref,
    () => ({
      setValoresInput: (contato: ContatoProps) => {
        setContato(contato.Contato ?? '')
        setTelefone(contato.Telefone ?? '')
        setDescricao(contato.Descricao ?? '')
      },
      resetarCampos: () => {
        setContato('')
        setTelefone('')
        setDescricao('')
      },
    }),
    [],
  )
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    onSubmit({
      contato,
      telefone,
      descricao,
    })
  }
  function handleContato(e: FormEvent<HTMLInputElement>) {
    setContato(e.currentTarget.value)
  }
  function handleTelefone(e: FormEvent<HTMLInputElement>) {
    setTelefone(e.currentTarget.value)
  }
  function handleDescricao(e: FormEvent<HTMLInputElement>) {
    setDescricao(e.currentTarget.value)
  }

  return {
    contato,
    telefone,
    descricao,
    handleContato,
    handleTelefone,
    handleDescricao,
    handleSubmit,
  }
}
