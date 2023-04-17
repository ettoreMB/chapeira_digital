import { AxiosInstance } from 'axios'
import { api } from './api'

export interface ColaboradorInputProps {
  lojaSigla: string
  nome: string
  email: string
  tipo: 'Colaborador' | 'Terceiro' | 'Visitante'
  endereco: string
  telefone: string
  universo: number
  funcao: string
  empresa: string
  administrador: 'Sim' | 'Nao'
  brigadista: string
  formacaoData: string
  admissaoData: string
  observacao: string
}

class UniversoService {
  httpClient: AxiosInstance
  constructor() {
    this.httpClient = api
  }

  async listarColaboradores(
    loja: string | string[] | undefined,
    universoId: string | string[] | undefined,
    tipo: string | string[] | undefined,
  ) {
    if (universoId) {
      const { data } = await api.get(
        `/colaboradores/${loja}?universoId=${universoId}`,
      )
      return data
    }
    if (tipo) {
      const { data } = await api.get(`/colaboradores/${loja}?tipo=${tipo}`)
      return data
    }
    const { data } = await api.get(`/colaboradores/${loja}`)
    return data
  }

  async buscarColaborador(id: string | string[] | undefined) {
    const { data } = await api.get(`/colaboradores/colaborador/${id}`)
    return data
  }

  async criarColaborador(
    lojaSigla: string,
    colaborador: ColaboradorInputProps,
  ) {
    await api.post('/colaboradores/criar', {
      lojaSigla,
      nome: colaborador.nome,
      email: colaborador.email,
      tipo: colaborador.tipo,
      endereco: colaborador.endereco,
      telefone: colaborador.telefone,
      universoId: colaborador.universo,
      funcao: colaborador.funcao,
      empresa: colaborador.empresa,
      administrador: colaborador.administrador,
      brigadista: colaborador.brigadista,
      formacaoData: colaborador.formacaoData,
      admissaoData: colaborador.formacaoData,
      observacao: colaborador.observacao,
    })
  }

  async editar(
    id: string | string[] | undefined,
    colaborador: ColaboradorInputProps,
  ) {
    await api.put('/colaboradores/criar', {
      id,
      nome: colaborador.nome,
      email: colaborador.email,
      tipo: colaborador.tipo,
      endereco: colaborador.endereco,
      telefone: colaborador.telefone,
      universoId: colaborador.universo,
      funcao: colaborador.funcao,
      empresa: colaborador.empresa,
      administrador: colaborador.administrador,
      brigadista: colaborador.brigadista,
      formacaoData: colaborador.formacaoData,
      admissaoData: colaborador.formacaoData,
      observacao: colaborador.observacao,
    })
  }

  async CheckinCheckOut(id: number) {
    await this.httpClient.put(`/colaboradores/checkinout/${id}`)
  }

  async deletar(id: number) {
    await this.httpClient.delete(`/colaboradores/${id}`)
  }

  async auth(email: string, senha: string) {
    const { data } = await this.httpClient.post('/auth', {
      email,
      senha,
    })

    return data
  }
}

export default new UniversoService() as UniversoService
