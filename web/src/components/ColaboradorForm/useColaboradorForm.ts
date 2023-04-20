import { api } from '@/services/api'
import { useRouter } from 'next/router'
import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

interface ColaboradorProps {
  id: string
  nome: string
  idUniverso: string
  universo: string
  email: string
  telefone: string
  endereco: string
  tipo: string
  empresa: string
  brigadista: string
  formacaoData: string
  admissaoData: string
  observacao: string
  administrador: string
}

interface UniversoProps {
  Id: 73
  Loja_Sigla: string
  Zona: string
  Andar: string
  Universo: string
}

interface UseColaboradorProps {
  ref: any
  onSubmit: (() => Promise<void>) | ((data: any) => Promise<void>)
}

export default function useColaboradorForm({
  ref,
  onSubmit,
}: UseColaboradorProps) {
  const router = useRouter()
  const [administrador, setAdministrador] = useState('Nao')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [funcao, setFuncao] = useState('')
  const [tipo, setTipo] = useState('Colaborador')
  const [endereco, setEndereco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [universoId, setUniversoId] = useState<any>()
  const [brigadista, setBrigadista] = useState('Nao')
  const [formacaoData, setFormacaoData] = useState('')
  const [empresa, setEmpresa] = useState('Decathlon')
  const [admissaoData, setAdmissaoData] = useState('')
  const [observacao, setObservacao] = useState('')
  const [universos, setUniversos] = useState<UniversoProps[]>([])
  const { loja } = router.query

  const carregarUniversos = useCallback(async () => {
    const { data } = await api.get(`/universos/${loja}`)
    setUniversos(data)
  }, [loja])
  function handleAdministrador(e: FormEvent<HTMLSelectElement>) {
    setAdministrador(e.currentTarget.value)
  }
  function handleNome(e: FormEvent<HTMLInputElement>) {
    setNome(e.currentTarget.value)
  }
  function handleEmail(e: FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)
  }
  function handleTipo(e: FormEvent<HTMLSelectElement>) {
    setTipo(e.currentTarget.value)
  }
  function handleEndereco(e: FormEvent<HTMLInputElement>) {
    setEndereco(e.currentTarget.value)
  }
  function handleTelefone(e: FormEvent<HTMLInputElement>) {
    setTelefone(e.currentTarget.value)
  }
  function handleUniverso(e: FormEvent<HTMLSelectElement>) {
    setUniversoId(Number(e.currentTarget.value))
  }
  function handleBrigadista(e: FormEvent<HTMLSelectElement>) {
    setBrigadista(e.currentTarget.value)
  }
  function handleFormacaoData(e: FormEvent<HTMLInputElement>) {
    setFormacaoData(e.currentTarget.value)
  }
  function handleEmpresa(e: FormEvent<HTMLInputElement>) {
    setEmpresa(e.currentTarget.value)
  }
  function handleAdmissaoData(e: FormEvent<HTMLInputElement>) {
    setAdmissaoData(e.currentTarget.value)
  }
  function handleObservacao(e: FormEvent<HTMLInputElement>) {
    setObservacao(e.currentTarget.value)
  }
  function handleFuncao(e: FormEvent<HTMLInputElement>) {
    setFuncao(e.currentTarget.value)
  }
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    onSubmit({
      loja,
      nome,
      email,
      universoId,
      tipo,
      funcao,
      administrador,
      brigadista,
      formacaoData,
      admissaoData,
      observacao,
      empresa,
      endereco,
      telefone,
    })
  }
  useImperativeHandle(
    ref,
    () => ({
      setValoresInput: (colaborador: ColaboradorProps) => {
        setAdministrador(colaborador.administrador ?? '')
        setNome(colaborador.nome ?? '')
        setEmail(colaborador.email ?? '')
        setTipo(colaborador.tipo ?? '')
        setEndereco(colaborador.endereco ?? '')
        setTelefone(colaborador.telefone ?? '')
        setUniversoId(colaborador.idUniverso ?? undefined)
        setBrigadista(colaborador.brigadista ?? '')
        setFormacaoData(colaborador.formacaoData ?? '')
        setEmpresa(colaborador.empresa ?? '')
        setAdmissaoData(colaborador.admissaoData ?? '')
        setObservacao(colaborador.observacao ?? '')
      },
      resetarCampos: () => {
        setAdministrador('')
        setNome('')
        setEmail('')
        setTipo('')
        setEndereco('')
        setTelefone('')
        setUniversoId(0)
        setBrigadista('')
        setFormacaoData('')
        setEmpresa('')
        setAdmissaoData('')
        setObservacao('')
      },
    }),
    [],
  )

  useEffect(() => {
    if (loja) {
      carregarUniversos()
    }
    return () => {}
  }, [carregarUniversos, loja])

  return {
    administrador,
    nome,
    email,
    tipo,
    endereco,
    telefone,
    universoId,
    brigadista,
    formacaoData,
    empresa,
    admissaoData,
    observacao,
    universos,
    funcao,
    setUniversoId,
    handleFuncao,
    handleSubmit,
    handleAdministrador,
    handleNome,
    handleEmail,
    handleTipo,
    handleEndereco,
    handleTelefone,
    handleUniverso,
    handleBrigadista,
    handleFormacaoData,
    handleEmpresa,
    handleAdmissaoData,
    handleObservacao,
  }
}
